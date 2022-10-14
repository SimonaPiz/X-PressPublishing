const express = require('express');
const seriesRouter = express.Router();
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

module.exports = seriesRouter;

// GET /api/series
seriesRouter.get('/', (req, res, next) => {
  db.all(
    `SELECT * FROM series;`,
    function (err, rows) {
      if (err) {
        return next(err);
      }
      res.status(200).send({series: rows});
    }
  );
});