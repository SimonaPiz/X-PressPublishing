const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./database.sqlite');

// Create table Artist in database
db.run(`CREATE TABLE IF NOT EXISTS Artist (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  date_of_birth TEXT NOT NULL,
  biography TEXT NOT NULL,
  is_currently_employed INTEGER DEFAULT 1
);`, function (err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('Artist table is correctly created');
    return;
  }
});

// Create table Series in database
db.run(`CREATE TABLE IF NOT EXISTS Series (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL
);`, function (err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('Series table is correctly created');
    return;
  }
});

// Create table Issue in database
db.run(`CREATE TABLE IF NOT EXISTS Issue (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  issue_number INTEGER NOT NULL,
  publication_date TEXT NOT NULL,
  artist_id INTEGER NOT NULL REFERENCES Artist(id),
  series_id INTEGER NOT NULL REFERENCES Series(id)
);`, function (err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('Issue table is correctly created');
    return;
  }
});