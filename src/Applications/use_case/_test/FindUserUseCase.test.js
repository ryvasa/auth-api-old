// const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
// const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const LoginUser = require('../../../Domains/users/entities/LoginUser');
const UserRepository = require('../../../Domains/users/UserRepository');
const PasswordVerify = require('../../security/PasswordVerify');
const FindUserUseCase = require('../FindUserUseCase');

describe('FindUserUseCase', () => {
  it('should orchestrating the find user action correctly', async () => {
    // Arrange
    const useCasePayload = {
      username: 'dicoding',
      password: 'secret',
    };
    const mockLoginUser = new LoginUser({
      username: useCasePayload.username,
      password: useCasePayload.password,
    });

    /** creating dependency of use case */
    const mockUserRepository = new UserRepository();
    const mockPasswordVerify = new PasswordVerify();

    /** mocking needed function */
    mockPasswordVerify.verify = jest
      .fn()
      .mockImplementation(() => Promise.resolve('encrypted_password'));
    mockUserRepository.findOne = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockLoginUser));

    /** creating use case instance */
    const getUserUseCase = new FindUserUseCase({
      userRepository: mockUserRepository,
      passwordVerify: mockPasswordVerify,
    });

    // Action
    const loginUser = await getUserUseCase.execute(useCasePayload);

    // Assert
    expect(loginUser).toStrictEqual(
      new LoginUser({
        username: useCasePayload.username,
        password: useCasePayload.password,
      })
    );
    expect(mockPasswordVerify.verify).toBeCalledWith(useCasePayload.password);
    expect(mockUserRepository.findOne).toBeCalledWith(
      new LoginUser({
        username: useCasePayload.username,
        password: useCasePayload.password,
      })
    );
  });
});

// const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
// const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
// const LoginUser = require('../../../Domains/users/entities/LoginUser');
// const UserRepository = require('../../../Domains/users/UserRepository');
// const PasswordVerify = require('../../security/PasswordVerify');
// const FindUserUseCase = require('../FindUserUseCase');

// describe('FindUserUseCase', () => {
//   it('should orchestrating the logib user action correctly', async () => {
//     // Arrange
//     const useCasePayload = {
//       username: 'dicoding',
//       password: 'secret',
//     };
//     const mockLoginUser = new LoginUser({
//       id: 'user-123',
//       username: useCasePayload.username,
//       password: useCasePayload.password,
//     });

//     /** creating dependency of use case */
//     const mockUserRepository = new UserRepository();
//     const mockPasswordVerify = new PasswordVerify();

//     /** mocking needed function */
//     mockUserRepository.findOne = jest
//       .fn()
//       .mockImplementation(() => Promise.resolve(mockLoginUser));
//     mockPasswordVerify.verify = jest
//       .fn()
//       .mockImplementation(() => Promise.resolve('encrypted_password'));

//     /** creating use case instance */
//     const getUserUseCase = new FindUserUseCase({
//       userRepository: mockUserRepository,
//       passwordVerify: mockPasswordVerify,
//     });

//     // Action
//     const loginUser = await getUserUseCase.execute(useCasePayload);

//     // Assert
//     expect(loginUser).toStrictEqual(
//       new LoginUser({
//         id: 'user-123',
//         username: useCasePayload.username,
//         fullname: useCasePayload.fullname,
//       })
//     );
//     expect(mockUserRepository.findOne).toBeCalledWith(
//       new LoginUser({
//         username: useCasePayload.username,
//         password: 'encrypted_password',
//       })
//     );
//     expect(mockPasswordVerify.verify).toBeCalledWith(useCasePayload.password);
//   });
// });
