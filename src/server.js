require('dotenv').config();

const morgan = require('morgan');
const express = require('express');
const logger = require('./utils/logger');

const app = express();

const { errorHandler, notFoundHandler } = require('./middlewares');

const productRouter = require('./routes/product');
const authRouter = require('./routes/auth');

// other middlewares
app.use(morgan('dev'));

// core middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);

// apply error handlers
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(process.env.NODE_PORT, () => {
    logger.info(`Server is running at port: ${process.env.NODE_PORT}`);
});
