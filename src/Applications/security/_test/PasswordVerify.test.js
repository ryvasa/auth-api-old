const PasswordVerify = require('../PasswordVerify');

describe('PasswordHash interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const passwordVerify = new PasswordVerify();

    // Action & Assert
    await expect(passwordVerify.verify('dummy_password')).rejects.toThrowError(
      'PASSWORD_VERIFY.METHOD_NOT_IMPLEMENTED'
    );
  });
});
