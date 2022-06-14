const Joi = require('joi');

const loginSchemas = Joi.object({
  userId: Joi.number().required().empty()
    .messages({
      'any.required': '400|UserId is required',
      'number.empty': '400|UserId is required',
      'number.base': '400|UserId must be a number',
  }),
  sellerId: Joi.number().required().empty()
    .messages({
      'any.required': '400|SellerId is required',
      'number.empty': '400|SellerId is required',
      'number.base': '400|SellerId must be a number',
  }),
  totalPrice: Joi.number().required().empty()
    .messages({
      'any.required': '400|TotalPrice is required',
      'number.empty': '400|TotalPrice is required',
      'number.base': '400|TotalPrice must be a number',
    }),
  deliveryAddress: Joi.string().required().empty()
    .messages({
      'any.required': '400|DeliveryAddress is required',
      'string.empty': '400|DeliveryAddress is required',
      'string.base': '400|DeliveryAddress must be a string',
    }),
  deliveryNumber: Joi.number().required().empty()
    .messages({
      'any.required': '400|DeliveryNumber is required',
      'number.empty': '400|DeliveryNumber is required',
      'number.base': '400|DeliveryNumber must be a number',
    }),
  saleDate: Joi.date().required().empty()
    .messages({
      'any.required': '400|SaleDate is required',
      'date.empty': '400|SaleDate is required',
      'date.base': '400|SaleDate must be a date',
    }),
  status: Joi.string().required().empty()
    .messages({
      'any.required': '400|Status is required',
      'string.empty': '400|Status is required',
      'string.base': '400|Status must be a string',
    }),
});

module.exports = loginSchemas;
