const loginSchemas = require('../schemas/loginSchemas');

const loginMiddleware = async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = loginSchemas.validate({ email, password });

  if (error) {
    const [code, message] = error.message.split('|');

    return res.status(Number(code)).json({ message });
  }

  return next();
};

module.exports = loginMiddleware;
