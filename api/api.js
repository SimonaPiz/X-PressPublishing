const express = require('express');
const apiRouter = express.Router();

module.exports = apiRouter;

//Import and connect artistsRouter for path 'api/artists'
const artistsRouter = require('./artists');
apiRouter.use('/artists', artistsRouter);

//Import and connect seriesRouter for path 'api/series'
const seriesRouter = require('./series');
apiRouter.use('/series', seriesRouter);

//Import and connect issuesRouter for path 'api/:seriesId/issues'
const issuesRouter = require('./issues');
apiRouter.use('/:seriesId/issues', issuesRouter);