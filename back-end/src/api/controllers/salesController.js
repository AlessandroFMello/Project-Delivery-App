const SalesService = require('../services/salesService');
const TokenGenerator = require('../tokenGenerator');

class SalesController {
  constructor() {
    this.salesService = new SalesService();
    this.tokenGenerator = new TokenGenerator();

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
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

  async getById(req, res, _next) {
    const { id } = req.params;

    const { code, sale, message } = await this.salesService.getById(id);

    if (!sale) {
      return res.status(code).json({ message });
    }

    return res.status(code).json(sale);
  }

  async create(req, res, _next) {
    const { code, sale, message } = await this.salesService.create(req.body);
    
    if (!sale) {
      return res.status(code).json({ message });
    }
    return res.status(code).json(sale);
  }
}
   module.exports = SalesController;
