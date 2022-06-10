const router = require('express').Router();
const SalesController = require('../controllers/salesController');
// const userMiddleware = require('../middlewares/userMiddleware');

const salesController = new SalesController();

 router.get('/', salesController.getAll);

// router.get('/:id', salesController.getById);

//* router.post('/', /* salesMiddleware */ salesController.create);

// router.patch('/:id', salesMiddleware, salesController.update);

// router.delete('/:id', salesController.delete);

module.exports = router;