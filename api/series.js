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

//Import and connect issuesRouter for path 'api/series/:seriesId/issues'
const issuesRouter = require('./issues');
seriesRouter.use('/:seriesId/issues', issuesRouter);

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

// GET /api/series/:seriesId
seriesRouter.get('/:seriesId', (req, res, next) => {
  res.status(200).send({series: req.series});
});

// Create function to validate new series before adding to the database
const validateData = (req, res, next) => {
  const newData = req.body.series;
  //console.log(newData);

  if (
    typeof newData.name !== 'string' || !newData.name ||
    typeof newData.description !== 'string' || !newData.description 
  ) {
    res.sendStatus(400);
    return;
  } else {
    //console.log('Data are valid');
    next();
  }
};

// POST - Create new series
seriesRouter.post('/', validateData, (req, res, next) => {
  //console.log(req.body.series);
  const newSeries = req.body.series;

  db.run(
    `INSERT INTO Series (name, description)
    VALUES (
      '${newSeries.name}',
      '${newSeries.description}'
    );`,
    function (err) {
      if (err) {
        return next(err);
      }
      db.get(
        `SELECT * FROM Series WHERE id = ${this.lastID};`,
        (err, row) => {
          if (err) {
            return next(err);
          }
          res.status(201).send({series: row});
        }
      );
    }
  );
});

// PUT - Update series by seriesId
seriesRouter.put('/:seriesId', (req, res, next) => {
  const updateSeries = req.body.series;
  //console.log(updateSeries);

  if (
    typeof updateSeries.name !== 'string' || !updateSeries.name ||
    typeof updateSeries.description !== 'string' || !updateSeries.description  
  ) {
    res.sendStatus(400);
    return;
  } else {
    db.run(
      `UPDATE Series SET 
      name = '${updateSeries.name}',
      description = '${updateSeries.description}'
      WHERE id = ${req.seriesId};`,
      function (err) {
        if (err) {
          return next(err);
        }
        db.get(
          `SELECT * FROM Series WHERE id = ${req.seriesId};`,
          (err, row) => {
            if (err) {
              return next(err);
            }
            res.status(200).send({series: row});
          }
        );
      }
    );
  }
});

// DELETE - Delete series by its id
seriesRouter.delete('/:seriesId', (req, res, next) => {
  db.all(
    `SELECT * FROM  Issue
    WHERE series_id = ${req.seriesId};`,
    function(err, rows) {
      if (rows.length === 0) {
        db.run(
          `DELETE FROM Series 
          WHERE id = ${req.seriesId};`,
          function(err) {            
            res.sendStatus(204);
          } 
        );
      } else {
        res.sendStatus(400);
      }

    }
  );
});