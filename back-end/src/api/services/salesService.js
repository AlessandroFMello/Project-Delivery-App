const { Sale, SalesProducts, Product, User } = require('../../database/models');

class SalesService {
  constructor() {
    this.salesModel = Sale;
    this.salesProductsModel = SalesProducts;

    this.NOT_FOUND = 'Sales not found';

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.salesProductsCreate = this.salesProductsCreate.bind(this);
    this.getSalesByUserId = this.getSalesByUserId.bind(this);
    this.getSalesBySellerId = this.getSalesBySellerId.bind(this);
    // this.update = this.update.bind(this);
    // this.delete = this.delete.bind(this);
  }

  async getAll() {
    const sales = await this.salesModel.findAll({
      include: [{
        model: Product, as: 'products',
      }],
    });
    return { code: 200, sales };
  }

  async getById(id) {
    const sale = await this.salesModel.findOne({
      where: { id },
      include: [
        { model: Product, as: 'products' }, { model: User, as: 'seller' },
      ],
      });

    if (!sale) return { code: 404, message: this.NOT_FOUND };

    return { code: 200, sale };
  }

  async getSalesByUserId(id) {
    const userSales = await this.salesModel.findAll({ where: { userId: id } });

    if (!userSales) return { code: 404, message: this.NOT_FOUND };

    return { code: 200, userSales };
  }

  async getSalesBySellerId(id) {
    const sellerSales = await this.salesModel.findAll({ where: { sellerId: id } });

    if (!sellerSales) return { code: 404, message: this.NOT_FOUND };

    return { code: 200, sellerSales };
  }

  salesProductsCreate(data, sale) {
    return (
    data.products.forEach(async (product) => {
      await this.salesProductsModel.create({
        saleId: sale.dataValues.id,
        productId: product.id,
        quantity: product.quantity,
      });
    }));
  }

  async create(data) {
    const newSale = {
      userId: data.userId,
      sellerId: data.sellerId,
      totalPrice: data.totalPrice,
      deliveryAddress: data.deliveryAddress,
      deliveryNumber: data.deliveryNumber,
      saleDate: new Date(),
      status: 'Pendente',
    };
  
    const sale = await this.salesModel.create(newSale);

    if (!sale) return { code: 400, message: 'Sale not created' };

    await this.salesProductsCreate(data, sale);

    return { code: 201, sale: sale.dataValues };
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