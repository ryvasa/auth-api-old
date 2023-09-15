const bcrypt = require('bcrypt');
const BcryptPasswordVerify = require('../BcryptPasswordVerify');

describe('BcryptPasswordVerify', () => {
  describe('verify function', () => {
    it('should verify return false', async () => {
      // Arrange
      const spyVerify = jest.spyOn(bcrypt, 'compare');
      const bcryptPasswordVerify = new BcryptPasswordVerify(bcrypt);
      const encryptedPassword = await bcrypt.hash('plain_password', 10);

      // Action
      const result = await bcryptPasswordVerify.verify(
        'wrong_password',
        encryptedPassword
      );
      // Assert
      expect(typeof result).toEqual('boolean');
      expect(result).toEqual(false);
      expect(result).not.toEqual('wrong_password');
      expect(spyVerify).toBeCalledWith('wrong_password', encryptedPassword); // 10 adalah nilai saltRound default untuk BcryptPasswordVerify
    });

    it('should verify return true', async () => {
      // Arrange
      const spyVerify = jest.spyOn(bcrypt, 'compare');
      const bcryptPasswordVerify = new BcryptPasswordVerify(bcrypt);
      const encryptedPassword = await bcrypt.hash('plain_password', 10);

      // Action
      const result = await bcryptPasswordVerify.verify(
        'plain_password',
        encryptedPassword
      );
      // Assert
      expect(typeof result).toEqual('boolean');
      expect(result).toEqual(true);
      expect(result).not.toEqual('plain_password');
      expect(spyVerify).toBeCalledWith('plain_password', encryptedPassword); // 10 adalah nilai saltRound default untuk BcryptPasswordVerify
    });
  });
});
