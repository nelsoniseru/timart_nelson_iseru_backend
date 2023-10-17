const {
  users,
} = require('../../utils/constant');

const {
  validateUserInput,
  validateEmailInput,
  validateOtp,
  validateResetPasswordInput,
} = require('../../utils/validation');

const {
  authenticateToken,
} = require('../../utils/middleware');

const UserController = require('./users.controller');
const UserService = require('./users.service');

const userService = new UserService();
const userController = new UserController(userService);
class UsersRoutes {
  constructor(app, userController) {
    this.app = app;
    this.userController = userController;
  }

  async routes() {
    this.app.get('/', (req, res) => userController.sayHello(req, res));
    this.app.post(`${users}/login`, validateUserInput, (req, res) => userController.postLogin(req, res));
    this.app.post(`${users}/mail-verification`, validateEmailInput, (req, res) => userController.postVerifyMail(req, res));
    this.app.post(`${users}/otp`, validateOtp, (req, res) => userController.postOtp(req, res));
    this.app.post(`${users}/reset-password`, validateResetPasswordInput, (req, res) => userController.postResetPassword(req, res));
    this.app.get(`${users}/dashboard`, authenticateToken, (req, res) => userController.getProfile(req, res));
  }
}

module.exports = UsersRoutes;
