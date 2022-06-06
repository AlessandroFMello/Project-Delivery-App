const UserService = require('../services/userService');

class UserController {
  constructor() {
    this.userService = new UserService();

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(_req, res, _next) {
    const { code, users, message } = await this.userService.getAll();

    if (!users) {
      return res.status(code).json({ message });
    }

    return res.status(code).json(users);
  }

  async getById(req, res, _next) {
    const { id } = req.params;

    const { code, user, message } = await this.userService.getById(id);

    if (!user) {
      return res.status(code).json({ message });
    }

    return res.status(code).json(user);
  }

  async create(req, res, _next) {
    const { code, user, message } = await this.userService.create(req.body);

    if (!user) {
      return res.status(code).json({ message });
    }

    return res.status(code).json(user);
  }

  async update(req, res, _next) {
    const { id } = req.params;

    const { code, user, message } = await this.userService.update(id, req.body);

    if (!user) {
      return res.status(code).json({ message });
    }

    return res.status(code).json(user);
  }

  async delete(req, res, _next) {
    const { id } = req.params;

    const { code, message } = await this.userService.delete(id);

    if (message) {
      return res.status(code).json({ message });
    }

    return res.status(code).end();
  }
}

module.exports = UserController;