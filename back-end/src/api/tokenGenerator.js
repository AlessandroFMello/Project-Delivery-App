const jwt = require('jsonwebtoken');
const { readFile } = require('fs/promises');

class TokenGenerator {
  createToken = async (
    { id, username, email, role },
  ) => jwt.sign(
    { id, username, email, role },
    await readFile('jwt.evaluation.key', 'utf8'),
    { expiresIn: '1d', algorithm: 'HS256' },
  );

  decodeToken = async (token) => jwt.verify(
    token,
    await readFile('jwt.evaluation.key', 'utf8'),
  );
}

module.exports = TokenGenerator;
