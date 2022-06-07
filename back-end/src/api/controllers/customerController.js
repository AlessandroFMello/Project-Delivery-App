const CustomerOrderService = require('../services/customerOrderService');
const TokenGenerator = require('../tokenGenerator');

class CustomerController {
  constructor() {
    this.customerOrderService = new CustomerOrderService();
    this.tokenGenerator = new TokenGenerator();

    this.getSale = this.getSale.bind(this);
  }

  // async getSale() {
  //   const response = await this.tokenGenerator.decodeToken(token);

  //   console.log(response);

  //   const sales = await this.customerOrderService.getSale(response.data.id);

  //   console.log(sales);
    
  //   return res.status(200).json(sales);
  // }
}

module.exports = CustomerController;
