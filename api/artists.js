const express = require('express');
const artistsRouter = express.Router();
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

module.exports = artistsRouter;

// GET /api/artists
artistsRouter.get('/', (req, res, next) => {
  db.all(
    `SELECT * FROM Artist WHERE is_currently_employed = 1;`,
    function (err, rows) {
      if (err) {
        next(err);
      }
      res.status(200).send({artists: rows});
    }
  );
});