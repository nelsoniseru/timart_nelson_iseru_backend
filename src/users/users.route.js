const {
  users,
} = require('../../utils/constant');

const {
  validateUserInput,
  validateLoginInput,
  validateDepositInput
} = require('../../utils/validation');

const {
  authenticateToken,
} = require('../../utils/middleware');

const UserController = require('./users.controller');
const UserService = require('./users.service');

const userService = new UserService();
const userController = new UserController(userService);
class UsersRoutes {
  constructor(app) {
    this.app = app;
    this.userController = userController;
  }

  async routes() {
    this.app.get('/', (req, res) => userController.sayHello(req, res));
    this.app.post(`${users}/register`, validateUserInput, (req, res) => userController.postRegister(req, res));
    this.app.post(`${users}/login`, validateLoginInput, (req, res) => userController.postLogin(req, res));
    this.app.get(`${users}/get-user/:id`, (req, res) => userController.getUser(req, res));
    this.app.post(`${users}/deposit`, authenticateToken, validateDepositInput, (req, res) => userController.postDeposit(req, res));

  }
}

module.exports = UsersRoutes;
