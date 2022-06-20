const CryptoJS = require('crypto-js');
const { Op } = require('sequelize'); 
const { User } = require('../../database/models');

class UserService {
  constructor() {
    this.userModel = User;

    this.NOT_FOUND = 'User not found';

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
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
      role: data.role ? data.role : 'customer',
    };

    const user = await this.userModel.create(newUser);

    if (!user) return { code: 400, message: 'User not created' };

    return { code: 201, user: user.dataValues };
  }

  async update(id, data) {
    const findUser = await this.userModel.findOne({ where: { id } });

    if (!findUser) return { code: 404, message: this.NOT_FOUND };
    
    const password = CryptoJS.MD5(data.newPassword).toString();

    const updatedUser = {
      name: data.name,
      email: data.email,
      password,
      role: data.role,
    };

    const user = await this.userModel.update(updatedUser, { where: { id } });
    
    if (!user) return { code: 401, message: 'User not updated' };

    return { code: 200, user };
  }

  async delete(id) {
    const findUser = await this.userModel.findOne({ where: { id } });

    if (!findUser) return { code: 404, message: this.NOT_FOUND };
    
    const user = await this.userModel.destroy({ where: { id } });

    if (!user) return { code: 401, message: 'User not deleted' };

    return { code: 200 };
  }
}

module.exports = UserService;