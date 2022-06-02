const router = require('express').Router();
const loginMiddleware = require('../middlewares/loginMiddleware');
const LoginController = require('../controllers/loginController');

const loginController = new LoginController();

router.post('/', loginMiddleware, loginController.login);

router.get('/validate', loginController.validation);

module.exports = router;
