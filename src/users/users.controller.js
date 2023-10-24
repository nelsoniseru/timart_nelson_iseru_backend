const {
  STATUS_CODE_OK,
  STATUS_CODE_BAD_REQUEST,
} = require('../../utils/constant');

const { checkError } = require('../../utils/middleware');
const {
  generateNumericOTP,
} = require('../../utils/middleware');

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async sayHello(req, res) {
    try {
      const message = await this.userService.sayHello();
      return res.status(STATUS_CODE_OK)
        .json({
          success: true,
          message,

        });
    } catch (error) {
      res.status(STATUS_CODE_BAD_REQUEST)
        .json({
          success: false,
          message: error.message
        });
    }
  }


  async postRegister(req, res) {
    try {
      const errors = checkError(req)
      if (!errors.isEmpty()) return res.status(STATUS_CODE_BAD_REQUEST)
        .json({
          success: false,
          message: errors.mapped()
        })
      const { username, email, password } = req.body
      const result = await this.userService.postRegister(username, email, password)
      return res.status(STATUS_CODE_OK)
        .json({
          success: true,
          message: result.message,
          token: result.token
        });
    } catch (error) {
      res.status(STATUS_CODE_BAD_REQUEST)
        .json({
          success: false,
          message: error.message
        });
    }
  }

  async postLogin(req, res) {
    try {
      const errors = checkError(req);
      if (!errors.isEmpty()) return res.status(STATUS_CODE_BAD_REQUEST).json({ success: false, message: errors.mapped() });

      const { email, password } = req.body;
      const token = await this.userService.postLogin(email, password);
      return res.status(STATUS_CODE_OK).json({ success: true, message: 'user login successfully', token });
    } catch (error) {
      res.status(STATUS_CODE_BAD_REQUEST).json({ success: false, message: error.message });
    }
  }

  async getUser(req, res) {
    try {
      const { id } = req.params;
      const result = await this.userService.getUser(id);
      return res.status(STATUS_CODE_OK)
        .json({
          success: true,
          message: "user found successfully",
          user: result
        })

    } catch (error) {
      res.status(STATUS_CODE_BAD_REQUEST)
        .json({
          success: false,
          message: error.message
        });
    }
  }


  async postDeposit(req, res) {
    try {
      const { amt } = req.body
      const user = req.user
      let result = await this.userService.postDeposit(amt, user);
      res.json({ message: "Amount deposited successfully", result });

    } catch (error) {
      res.status(401).json({ error: error.message });
    }

  }
  async getAllUsers(req, res) {
    try {
      const errors = checkError(req)
      if (!errors.isEmpty()) return res.status(STATUS_CODE_BAD_REQUEST)
        .json({
          success: false,
          message: errors.mapped()
        })
      const result = await this.userService.getAllUsers()
      return res.status(STATUS_CODE_OK)
        .json({
          success: true,
          message: "Users found successfully",
          user: result,
          token: result.token
        });
    } catch (error) {
      res.status(STATUS_CODE_BAD_REQUEST)
        .json({
          success: false,
          message: error.message
        });
    }
  }
}

module.exports = UserController;
