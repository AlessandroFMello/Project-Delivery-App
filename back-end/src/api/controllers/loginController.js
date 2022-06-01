const LoginService = require('../services/loginService');
const TokenGenerator = require('../tokenGenerator');

class LoginController {
  constructor() {
    this.loginService = new LoginService();
  }

  login = async (req, res, _next) => {
    const { email, password } = req.body;

    const { code, user, message } = await this.loginService.login(email, password);

    if (!user) {
      return res.status(code).json({ message });
    }

    return res.status(code).json(user);
  };

  validation = async (req, res, _next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(400).json({ message: 'Unauthorized' });
    }

    const tokenGenerator = new TokenGenerator();

    const decodedUser = await tokenGenerator.decodeToken(authorization);

    return res.status(200).json(decodedUser.role);
  };
}

module.exports = LoginController;