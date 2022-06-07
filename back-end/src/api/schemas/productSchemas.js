const Joi = require('joi');

const error400 = '400|All fields must be filled';

const loginSchemas = Joi.object({
  name: Joi.string().required().min(12).empty()
  .messages({
    'any.required': error400,
    'string.empty': error400,
    'string.base': '400|Name must be a string',
    'string.min': '401|Name must be equal or more than 12 characters',
  }),
  price: Joi.number().required().empty()
    .messages({
      'any.required': error400,
      'string.empty': error400,
      'string.base': '400|Password must be a string',
      'string.min': '401|Password must be equal or more 6 characters',
    }),
  urlImage: Joi.string().required().empty().email()
  .messages({
    'any.required': error400,
    'string.empty': error400,
    'string.base': '400|Email must be a string',
    'string.email': '400|Email must be a valid email',
  }),
});

module.exports = loginSchemas;
