const SalesService = require('../services/salesService');

class SalesController {
  constructor() {
    this.salesService = new SalesService();

    this.getAll = this.getAll.bind(this);
    // this.getById = this.getById.bind(this);
    //* this.create = this.create.bind(this);
    // this.update = this.update.bind(this);
    // this.delete = this.delete.bind(this);
  }

   async getAll(_req, res, _next) {
     const { code, sales, message } = await this.salesService.getAll();

     if (!sales) {
       return res.status(code).json({ message });
     }

     return res.status(code).json(sales);
   }

  // async getById(req, res, _next) {
  //   const { id } = req.params;

  //   const { code, product, message } = await this.productsService.getById(id);

  //   if (!product) {
  //     return res.status(code).json({ message });
  //   }

  //   return res.status(code).json(product);
  // }

  //* async create(req, res, _next) {
  //*   const { code, product, message } = await this.productsService.create(req.body);

  //*   if (!product) {
  //*     return res.status(code).json({ message });
  //*   }

  //   return res.status(code).json(product);
}
   module.exports = SalesController;
