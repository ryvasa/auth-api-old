const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.loginUserHandler,
  },
];

module.exports = routes;
