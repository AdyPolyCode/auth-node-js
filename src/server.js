require('dotenv').config({
    path: '.env',
});

const morgan = require('morgan');
const express = require('express');
const app = express();

const { errorHandler, notFoundHandler } = require('./middlewares');

const productRouter = require('./routes/product');

// apply middlewares for application
// other middlewares
app.use(morgan('dev'));

// core middlewares
app.use(express.json());

// routers
app.use('/api/products', productRouter);

// apply error handlers
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(process.env.NODE_PORT, () => {
    console.log(`Server is running at port: ${process.env.NODE_PORT}`);
});
