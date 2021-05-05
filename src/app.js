const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

const routes = require('./route/routes');

app.use('/', routes);

module.exports = app;
