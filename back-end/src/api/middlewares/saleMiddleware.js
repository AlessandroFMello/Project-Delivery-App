const saleSchemas = require('../schemas/saleSchemas');

const productsMiddleware = async (req, res, next) => {
  const {
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber,
  } = req.body;

  const { error } = saleSchemas.validate({
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber,
  });

  if (error) {
    const [code, message] = error.message.split('|');

    return res.status(Number(code)).json({ message });
  }

  return next();
};

module.exports = productsMiddleware;
