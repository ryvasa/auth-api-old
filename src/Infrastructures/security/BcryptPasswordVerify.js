const PasswordHash = require('../../Applications/security/PasswordHash');

class BcryptPasswordVerify extends PasswordHash {
  constructor(bcrypt) {
    super();
    this._bcrypt = bcrypt;
  }

  async verify(password, hashedPassword) {
    return this._bcrypt.compare(password, hashedPassword);
  }
}

module.exports = BcryptPasswordVerify;
