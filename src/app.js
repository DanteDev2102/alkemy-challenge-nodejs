const express = require('express');
const router = require('./utils/routes.utils');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router(app);

module.exports = app;
