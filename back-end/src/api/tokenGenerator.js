const jwt = require('jsonwebtoken');
const { readFile } = require('fs/promises');

class TokenGenerator {
  constructor() {
    this.jwt = jwt;
    this.createToken = this.createToken.bind(this);
    this.decodeToken = this.decodeToken.bind(this);
  }

  async createToken({ id, name, email, role }) {
    return this.jwt.sign(
    { id, name, email, role },
    await readFile('jwt.evaluation.key', 'utf8'),
    { expiresIn: '1d', algorithm: 'HS256' },
    );
  }

  async decodeToken(token) {
    return this.jwt.verify(token, await readFile('jwt.evaluation.key', 'utf8'));
  }
}

module.exports = TokenGenerator;
