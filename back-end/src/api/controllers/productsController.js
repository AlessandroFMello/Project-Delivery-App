const ProductsService = require('../services/productsService');

class ProductsController {
  constructor() {
    this.productsService = new ProductsService();

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    // this.create = this.create.bind(this);
    // this.update = this.update.bind(this);
    // this.delete = this.delete.bind(this);
  }

  async getAll(_req, res, _next) {
    const { code, products, message } = await this.productsService.getAll();

    if (!products) {
      return res.status(code).json({ message });
    }

    return res.status(code).json(products);
  }

  async getById(req, res, _next) {
    const { id } = req.params;

    const { code, product, message } = await this.productsService.getById(id);

    if (!product) {
      return res.status(code).json({ message });
    }

    return res.status(code).json(product);
  }

  // async create(req, res, _next) {
  //   const { code, product, message } = await this.productsService.create(req.body);

  //   if (!product) {
  //     return res.status(code).json({ message });
  //   }

  //   return res.status(code).json(product);
  // }

  // async update(req, res, _next) {
  //   const { id } = req.params;

  //   const { code, product, message } = await this.productsService.update(id, req.body);

  //   if (!product) {
  //     return res.status(code).json({ message });
  //   }

  //   return res.status(code).json(product);
  // }

  // async delete(req, res, _next) {
  //   const { id } = req.params;

  //   const { code, message } = await this.productsService.delete(id);

  //   if (message) {
  //     return res.status(code).json({ message });
  //   }

  //   return res.status(code).end();
  // }
}

module.exports = ProductsController;