const productSchemas = require('../schemas/productSchemas');

const productsMiddleware = async (req, res, next) => {
  const { name, price, urlImage } = req.body;

  const { error } = productSchemas.validate({ name, price, urlImage });

  if (error) {
    const [code, message] = error.message.split('|');

    return res.status(Number(code)).json({ message });
  }

  return next();
};

module.exports = productsMiddleware;
