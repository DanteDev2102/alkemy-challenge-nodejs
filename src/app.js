const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const router = require('./utils/routes.utils');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(compression());

router(app);

module.exports = app;
