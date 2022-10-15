const express = require('express');
const apiRouter = express.Router();

module.exports = apiRouter;

//Import and connect artistsRouter for path 'api/artists'
const artistsRouter = require('./artists');
apiRouter.use('/artists', artistsRouter);

//Import and connect seriesRouter for path 'api/series'
const seriesRouter = require('./series');
apiRouter.use('/series', seriesRouter);