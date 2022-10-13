const express = require('express');
const apiRouter = express.Router();

module.exports = apiRouter;

//Import and connect artistsRouter for path '/artists'
const artistsRouter = require('./artists');
apiRouter.use('/artists', artistsRouter);