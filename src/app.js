const express = require('express');
const cors = require('cors');
const router = require('./utils/routes.utils');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

router(app);

module.exports = app;
