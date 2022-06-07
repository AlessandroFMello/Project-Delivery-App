const CryptoJS = require('crypto-js');
const TokenGenerator = require('../tokenGenerator');
const { User } = require('../../database/models');

class LoginService {
  constructor() {
    this.tokenInstance = new TokenGenerator();

    this.login = this.login.bind(this);
  }

  async login(email, password) {
    const findUser = await User.findOne({ where: { email } });
    
    if (!findUser) return { code: 404, message: 'Incorrect email or password' };
    
    const encodedPassword = CryptoJS.MD5(password).toString();

    const verifyPassword = () => encodedPassword === findUser.password;

    if (!verifyPassword()) {
      return { code: 404, message: 'Incorrect email or password' };
    }

    const user = {
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
      role: findUser.role,
    };

    const token = await this.tokenInstance.createToken(user);

    return { code: 200, token };
  }
}

module.exports = LoginService;