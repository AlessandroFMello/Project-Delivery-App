const Joi = require('joi');

const loginSchemas = Joi.object({
  userId: Joi.number().strict().required().empty()
    .messages({
      'any.required': '400|UserId is required',
      'number.empty': '400|UserId is required',
      'number.base': '400|UserId must be a number',
  }),
  sellerId: Joi.number().strict().required().empty()
    .messages({
      'any.required': '400|SellerId is required',
      'number.empty': '400|SellerId is required',
      'number.base': '400|SellerId must be a number',
  }),
  totalPrice: Joi.number().strict().required().empty()
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
  deliveryNumber: Joi.string().required().empty()
    .messages({
      'any.required': '400|DeliveryNumber is required',
      'string.empty': '400|DeliveryNumber is required',
      'string.base': '400|DeliveryNumber must be a string',
    }),
});

module.exports = loginSchemas;
