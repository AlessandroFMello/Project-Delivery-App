const userSchemas = require('../schemas/userSchemas');

const userMiddleware = async (req, res, next) => {
  const { name, email, password } = req.body;

  const { error } = userSchemas.validate({ name, email, password });

  if (error) {
    const [code, message] = error.message.split('|');

    return res.status(Number(code)).json({ message });
  }

  return next();
};

module.exports = userMiddleware;
