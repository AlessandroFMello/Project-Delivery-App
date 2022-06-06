const { User } = require('../../database/models');

class UserService {
  constructor() {
    this.userModel = User;


    this.getAll = this.getAll.bind(this);
  }

  async getAll() {
    const users = await this.userModel.findAll();

    return { code: 200, users };
  }

}

module.exports = UserService;