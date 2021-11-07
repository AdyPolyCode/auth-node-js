const { validateBody } = require('../middlewares');
const router = require('express').Router();

const {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
} = require('../controllers/product');

router.route('/').get(getAll).post(createOne);

router.route('/:id').get(getOne).put(validateBody, updateOne).delete(deleteOne);

module.exports = router;
