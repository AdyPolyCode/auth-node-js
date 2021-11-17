const router = require('express').Router();
const { validateBody } = require('../middlewares');
const { createProduct, updateProduct } = require('../schemas');

const {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
} = require('../controllers/product');

router.route('/').get(getAll).post(validateBody(createProduct), createOne);

router
    .route('/:id')
    .get(getOne)
    .put(validateBody(updateProduct), updateOne)
    .delete(deleteOne);

module.exports = router;
