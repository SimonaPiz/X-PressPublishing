const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');

const PORT = process.env.PORT || 4001;

app.use(bodyParser.json());
app.use(cors());
app.use(errorHandler());