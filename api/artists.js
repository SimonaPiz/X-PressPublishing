const express = require('express');
const artistsRouter = express.Router();
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

module.exports = artistsRouter;

// Add param ':artistId' to set it in all Router
artistsRouter.param(':artistId', (req, res, next, index) => {
  const artistId = Number(index);
  if (artistId && artistId >= 0) {  
    db.get(
      `SELECT * FROM Artist WHERE id = ?;`,
      [artistId],
      function (err, row) {
        if (err) {
          next(err);
        } else if (row) {
          req.artist = row;
          next();
        } else {
          res.sendStatus(404);
        }
      }
    );
  } else {
    res.sendStatus(404);
  }
});

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

// GET /api/artists/:artistId
artistsRouter.get('/:artistId', (req, res, next) => {
  res.status(200).send({artist: req.artist});
});