const express = require('express');
const cors = require('cors');
const errorHandler = require('../middleware/error.middleware');
const userRouter = require('./Routes/user.router');
const costumerRouter = require('./Routes/customer.router');

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static('public'));

app.use(userRouter);
app.use(costumerRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorHandler);

module.exports = app;
