const router = require('express').Router();
const { validateBody } = require('../middlewares');
const { productCreate, productUpdate } = require('../schemas');

const {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
} = require('../controllers/product');

router.route('/').get(getAll).post(validateBody(productCreate), createOne);

router
    .route('/:id')
    .get(getOne)
    .put(validateBody(productUpdate), updateOne)
    .delete(deleteOne);

module.exports = router;
