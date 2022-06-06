const router = require('express').Router();
const UserController = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware');

const userController = new UserController();

router.get('/', userController.getAll);

router.get('/:id', userController.getById);

router.post('/', userMiddleware, userController.create);

router.put('/:id', userMiddleware, userController.update);


module.exports = router;