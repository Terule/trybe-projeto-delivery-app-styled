const express = require('express');
const cors = require('cors');
const errorHandler = require('../middleware/error.middleware');
const userRouter = require('./Routes/user.router');
const productRouter = require('./Routes/product.router');
const saleRouter = require('./Routes/sale.router');

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static('public'));

app.use(userRouter);
app.use(productRouter);
app.use(saleRouter);

app.use(errorHandler);

module.exports = app;
