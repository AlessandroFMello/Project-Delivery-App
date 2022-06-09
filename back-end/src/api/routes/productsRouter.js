const router = require('express').Router();
const ProductsController = require('../controllers/productsController');
// const userMiddleware = require('../middlewares/userMiddleware');

const productsController = new ProductsController();

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

// router.post('/', productsMiddleware, productsController.create);

// router.patch('/:id', productsMiddleware, productsController.update);

// router.delete('/:id', productsController.delete);

module.exports = router;