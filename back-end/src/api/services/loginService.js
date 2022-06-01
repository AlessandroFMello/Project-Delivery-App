const TokenGenerator = require('../tokenGenerator');
const { User } = require('../../database/models');
const CryptoJS = require('crypto-js');


class LoginService {
  login = async (email, password) => {
    const findUser = await User.findOne({ where: { email } });
    
    if (!findUser) return { code: 401, message: 'Incorrect email or password' };
    
    const encodedPassword = CryptoJS.MD5(password).toString();

    const verifyPassword = () => encodedPassword === findUser.password;

    if (!verifyPassword()) {
      return { code: 401, message: 'Incorrect email or password' };
    }

    const user = {
      id: findUser.id,
      username: findUser.username,
      email: findUser.email,
      role: findUser.role,
    };

    const tokenInstance = new TokenGenerator();
    const token = await tokenInstance.createToken(user);

    return { code: 200, user: { user, token } };
  };
}

module.exports = LoginService;