const router = require('express').Router();
const SalesController = require('../controllers/salesController');
const salesMiddleware = require('../middlewares/saleMiddleware');

const salesController = new SalesController();

 router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.get('/customer/:id', salesController.getSalesByUserId);

router.get('/seller/:id', salesController.getSalesBySellerId);

router.post('/', salesMiddleware, salesController.create);

// router.patch('/:id', salesMiddleware, salesController.update);

// router.delete('/:id', salesController.delete);

module.exports = router;