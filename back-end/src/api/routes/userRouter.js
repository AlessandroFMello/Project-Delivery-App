const router = require('express').Router();
const UserController = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware');

const userController = new UserController();

router.get('/', userController.getAll);

router.get('/:id', userController.getById);


module.exports = router;