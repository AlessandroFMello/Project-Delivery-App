const { Sale } = require('../../database/models');
const TokenGenerator = require('../tokenGenerator');

class SalesService {
  constructor() {
    this.salesModel = Sale;
    this.tokenInstance = new TokenGenerator();

    this.NOT_FOUND = 'Sales not found';

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    // this.update = this.update.bind(this);
    // this.delete = this.delete.bind(this);
  }

  async getAll() {
    const sales = await this.salesModel.findAll();

    return { code: 200, sales };
  }

  async getById(id) {
    const sale = await this.salesModel.findOne({ where: { id } });

    if (!sale) return { code: 404, message: this.NOT_FOUND };

    return { code: 200, sale };
  }

  async create(data) {
    console.log(data);
    const newSale = {
      userId: data.userId,
      sellerId: data.sellerId,
      totalPrice: data.totalPrice,
      deliveryAddress: data.deliveryAddress,
      deliveryNumber: data.deliveryNumber,
      saleDate: new Date(),
      status: 'pendente',
    };
    const sale = await this.salesModel.create(newSale);
    const token = await this.tokenInstance.createToken(newSale);

    console.log(sale);

    if (!sale) return { code: 400, message: 'Sale not created' };

    return { code: 201, sale: sale.dataValues, token };
    }

  // async update(id, data) {
  //   const findproduct = await this.productModel.findOne({ where: { id } });

  //   if (!findproduct) return { code: 404, message: this.NOT_FOUND };
    
  //   const password = CryptoJS.MD5(data.newPassword).toString();

  //   const updatedproduct = {
  //     name: data.name,
  //     email: data.email,
  //     password,
  //     role: data.role,
  //   };

  //   const product = await this.productModel.update(updatedproduct, { where: { id } });
    
  //   if (!product) return { code: 401, message: 'product not updated' };

  //   return { code: 200, product };
  // }

  // async delete(id) {
  //   const findproduct = await this.productModel.findOne({ where: { id } });

  //   if (!findproduct) return { code: 404, message: this.NOT_FOUND };
    
  //   const product = await this.productModel.destroy({ where: { id } });

  //   if (!product) return { code: 401, message: 'product not deleted' };

  //   return { code: 200 };
  // }
}

module.exports = SalesService;