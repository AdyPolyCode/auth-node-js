require('dotenv').config();

const morgan = require('morgan');
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const logger = require('./utils/logger');

const app = express();

const { errorHandler, notFoundHandler, auth } = require('./middlewares');

const productRouter = require('./routes/product');
const authRouter = require('./routes/auth');

// apply settings for view engine
app.engine('hbs', hbs.engine({ extname: 'hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'templates'));

// apply middlewares for application

// other middlewares
app.use(morgan('dev'));

// core middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
app.use('/api/auth', authRouter);
app.use('/api/products', auth, productRouter);

app.get('/home', (req, res) => {
    res.render('password-reset', { value: 'value' });
});

// apply error handlers
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(process.env.NODE_PORT, () => {
    logger.info(`Server is running at port: ${process.env.NODE_PORT}`);
});
