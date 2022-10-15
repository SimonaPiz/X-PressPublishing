const express = require('express');
const issuesRouter = express.Router({mergeParams: true});
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

module.exports = issuesRouter;

// GET /api/series/:seriesId/issues
issuesRouter.get('/', (req, res, next) => {
  db.all(
    `SELECT * FROM Issue WHERE series_id = ${req.params.seriesId};`,
    function (err, rows) {
      if (err) {
        return next(err);
      }
      res.status(200).send({issues: rows});
    }
  );
});