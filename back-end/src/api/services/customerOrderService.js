// const { Sale } = require('../../database/models');
// const TokenGenerator = require('../tokenGenerator');

// class CustomerOrderService {
//   constructor() {
//     this.tokenInstance = new TokenGenerator();
//     this.getSale = this.getSale.bind(this);
//   }

//   async getSale(userId) {
//     const findSale = await Sale.findAll({ where: { userId } });
    
//     console.log('🚀 ~ file: customerOrderService.js ~ line 12 ~ CustomerOrderService ~ getSale ~ findSale', findSale);

//     return findSale;
//   }
// }

// module.exports = CustomerOrderService;
