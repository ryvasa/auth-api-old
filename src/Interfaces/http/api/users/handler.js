const AddUserUseCase = require('../../../../Applications/use_case/AddUserUseCase');
const FindUserUseCase = require('../../../../Applications/use_case/FindUserUseCase');

class UsersHandler {
  constructor(container) {
    this._container = container;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.loginUserHandler = this.loginUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    console.log('add user');
    const addUserUseCase = this._container.getInstance(AddUserUseCase.name);
    const addedUser = await addUserUseCase.execute(request.payload);
    const response = h.response({
      status: 'success',
      data: {
        addedUser,
      },
    });
    response.code(201);
    return response;
  }

  async loginUserHandler(request, h) {
    console.log('coba');
    const findUserUseCase = this._container.getInstance(FindUserUseCase.name);

    const theUser = await findUserUseCase.execute(request.payload);
    const response = h.response({
      status: 'success',
      data: {
        theUser,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UsersHandler;
