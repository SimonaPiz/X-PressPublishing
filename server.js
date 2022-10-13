const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4001;

app.use(bodyParser.json());