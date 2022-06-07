// const { Op } = require('sequelize');
const { Product } = require('../../database/models');

class ProductsService {
  constructor() {
    this.productModel = Product;

    this.NOT_FOUND = 'Product not found';

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    // this.create = this.create.bind(this);
    // this.update = this.update.bind(this);
    // this.delete = this.delete.bind(this);
  }

  async getAll() {
    const products = await this.productModel.findAll();

    return { code: 200, products };
  }

  async getById(id) {
    const product = await this.productModel.findOne({ where: { id } });

    if (!product) return { code: 404, message: this.NOT_FOUND };

    return { code: 200, product };
  }

  // async create(data) {
  //   const findproduct = await this.productModel.findOne({ 
  //     where: {
  //       [Op.or]: [{ name: data.name }, { email: data.email }],
  //     },
  //   });

  //   if (findproduct) return { code: 409, message: 'product already exists' };

  //   const newproduct = {
  //     name: data.name,
  //     email: data.email,
  //     password: data.password,
  //     role: 'customer',
  //   };

  //   const product = await this.productModel.create(newproduct);

  //   if (!product) return { code: 400, message: 'product not created' };

  //   return { code: 201, product: product.dataValues };
  // }

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

module.exports = ProductsService;