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

// Create function to validate new issue before adding to the database
const validateData = (req, res, next) => {
  const newData = req.body.issue;
  //console.log(newData);
  newData.issueNumber = Number(newData.issueNumber);
  newData.artistId = Number(newData.artistId);

  if (
    typeof newData.name !== 'string' || !newData.name ||
    newData.issueNumber < 0 || !newData.issueNumber ||
    typeof newData.publicationDate !== 'string' || !newData.publicationDate ||
    newData.artistId < 0 || !newData.artistId
  ) {
    res.sendStatus(400);
    return;
  } else {
    //console.log('Data are valid');
    next();
  }
};

// POST - Create new issue
issuesRouter.post('/', validateData, (req, res, next) => {
  //console.log(req.body.issue);
  const newIssue = req.body.issue;

  db.run(
    `INSERT INTO Issue (name, issue_number, publication_date, artist_id, series_id)
    VALUES (
      '${newIssue.name}',
      ${newIssue.issueNumber},
      '${newIssue.publicationDate}',
      ${newIssue.artistId},
      ${req.params.seriesId}
    );`,
    function (err) {
      if (err) {
        return next(err);
      }
      db.get(
        `SELECT * FROM Issue WHERE id = ${this.lastID};`,
        (err, row) => {
          if (err) {
            return next(err);
          }
          res.status(201).send({issue: row});
        }
      );
    }
  );
});
