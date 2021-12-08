const router = require('express').Router();
const { validateBody, auth } = require('../middlewares');
const { productCreate, productUpdate } = require('../schemas');

const {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
} = require('../controllers/product');

router
    .route('/')
    .get(auth('USER', 'ADMIN'), getAll)
    .post(auth('ADMIN'), validateBody(productCreate), createOne);

router
    .route('/:id')
    .get(auth('USER', 'ADMIN'), getOne)
    .put(auth('ADMIN'), validateBody(productUpdate), updateOne)
    .delete(auth('ADMIN'), deleteOne);

module.exports = router;
