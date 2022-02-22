const router = require('express').Router();
const { validateBody, authenticate } = require('../middlewares');
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
    .get(authenticate('USER', 'ADMIN'), getAll)
    .post(authenticate('ADMIN'), validateBody(productCreate), createOne);

router
    .route('/:id')
    .get(authenticate('USER', 'ADMIN'), getOne)
    .put(authenticate('ADMIN'), validateBody(productUpdate), updateOne)
    .delete(authenticate('ADMIN'), deleteOne);

module.exports = router;
