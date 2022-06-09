const Joi = require('joi');

const error401 = '401|Incorrect email or password';
const error400 = '400|All fields must be filled';

const loginSchemas = Joi.object({
  email: Joi.string().required().empty().messages({
    'any.required': error400,
    'string.empty': error400,
    'string.base': error401,
  }),

  password: Joi.string().min(6).required().empty()
    .messages({
      'any.required': error400,
      'string.empty': error400,
      'string.base': error401,
      'string.min': error401,
    }),
});

module.exports = loginSchemas;
