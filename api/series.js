const express = require('express');
const seriesRouter = express.Router();
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

module.exports = seriesRouter;

// Add param ':seriesId' to set it in all Router
seriesRouter.param('seriesId', (req, res, next, index) => {
  const seriesId = Number(index);
  if (seriesId && seriesId >= 0) {  
    db.get(
      `SELECT * FROM series WHERE id = ?;`,
      [seriesId],
      function (err, row) {
        if (err) {
          return next(err);
        } else if (row) {
          req.series = row;
          req.seriesId = seriesId;
          next();
        } else {
          res.sendStatus(404);
          return;
        }
      }
    );
  } else {
    res.sendStatus(404);
    return;
  }
});

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