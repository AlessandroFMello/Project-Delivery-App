const { Op } = require('sequelize'); 
const { User } = require('../../database/models');

class UserService {
  constructor() {
    this.userModel = User;

    this.NOT_FOUND = 'User not found';

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
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

  async create(data) {
    const findUser = await this.userModel.findOne({ 
      where: {
        [Op.or]: [{ name: data.name }, { email: data.email }],
      },
    });

    if (findUser) return { code: 409, message: 'User already exists' };

    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'customer',
    };

    const user = await this.userModel.create(newUser);

    if (!user) return { code: 400, message: 'User not created' };

    return { code: 201, user: user.dataValues };
  }

}

module.exports = UserService;