const LoginUser = require('../LoginUser');

describe('a LoginUser entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      username: 'abc',
    };

    // Action and Assert
    expect(() => new LoginUser(payload)).toThrowError(
      'LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      username: 123,
      password: 'abc',
    };
    // Action and Assert
    expect(() => new LoginUser(payload)).toThrowError(
      'LOGIN_USER.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });
  it('should throw error when username contains more than 50 character', () => {
    // Arrange
    const payload = {
      username: 'dicodingindonesiadicodingindonesiadicodingindonesiadicoding',
      password: 'abc',
    };
    // Action and Assert
    expect(() => new LoginUser(payload)).toThrowError(
      'LOGIN_USER.USERNAME_LIMIT_CHAR'
    );
  });
  it('should throw error when username contains restricted character', () => {
    // Arrange
    const payload = {
      username: 'dico ding',
      password: 'abc',
    };
    // Action and Assert
    expect(() => new LoginUser(payload)).toThrowError(
      'LOGIN_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER'
    );
  });
  it('should create LoginUser object correctly', () => {
    // Arrange
    const payload = {
      username: 'dicoding',
      password: 'abc',
    };
    // Action
    const { username, password } = new LoginUser(payload);
    // Assert
    expect(username).toEqual(payload.username);
    expect(password).toEqual(payload.password);
  });
});
