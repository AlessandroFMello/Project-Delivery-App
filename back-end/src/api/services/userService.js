const { User } = require('../../database/models');

class UserService {
  constructor() {
    this.userModel = User;

    this.NOT_FOUND = 'User not found';

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
  }

  async getAll() {
    const users = await this.userModel.findAll();

    return { code: 200, users };
  }

  async getById(id) {
    const user = await this.userModel.findOne({ where: { id } });

    if (!user) return { code: 404, message: this.NOT_FOUND };

    return { code: 200, user };
  }

}

module.exports = UserService;