const UserService = require('../services/userService');

class UserController {
  constructor() {
    this.userService = new UserService();

    this.getAll = this.getAll.bind(this);
  }

  async getAll(_req, res, _next) {
    const { code, users, message } = await this.userService.getAll();

    if (!users) {
      return res.status(code).json({ message });
    }

    return res.status(code).json(users);
  }


}

module.exports = UserController;