const LoginUser = require('../../Domains/users/entities/LoginUser');

class FindUserUseCase {
  constructor({ userRepository, passwordVerify }) {
    this._userRepository = userRepository;
    this._passwordVerify = passwordVerify;
  }

  async execute(useCasePayload) {
    console.log(useCasePayload);
    const loginUser = new LoginUser(useCasePayload);
    const user = await this._userRepository.findOne(loginUser);
    await this._passwordVerify.verify(loginUser.password);
    return user;
  }
}

module.exports = FindUserUseCase;
