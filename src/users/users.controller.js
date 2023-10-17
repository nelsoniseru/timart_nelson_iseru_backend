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
      return res.status(STATUS_CODE_OK).json({ success:true,message });
    } catch (error) {
      res.status(STATUS_CODE_BAD_REQUEST).json({ success:false,error: error.message });
    }
  }

  async postLogin(req, res) {
    try {
      const errors = checkError(req);
      if (!errors.isEmpty()) return res.status(STATUS_CODE_BAD_REQUEST).json({ success:false, message: errors.mapped()  });

      const { username, password } = req.body;
      const token = await this.userService.postLogin(username, password);
      return res.status(STATUS_CODE_OK).json({success:true, message: 'user login successfully', token });
    } catch (error) {
      res.status(STATUS_CODE_BAD_REQUEST).json({success:false, message: error.message });
    }
  }

  async getProfile(req, res) {
    try {
      const { user } = req;
      const result = await this.userService.getProfile(user);
      return res.status(STATUS_CODE_OK)
        .json({success:true, message: "user found successfully", user: result })

    } catch (error) {
      res.status(STATUS_CODE_BAD_REQUEST).json({success:false, message: error.message });
  }
  }
  async postVerifyMail(req, res) {
    try {
      const errors = checkError(req)
      if (!errors.isEmpty()) return res.status(STATUS_CODE_BAD_REQUEST).json({success:false, message: errors.mapped()  })
      const { username } = req.body
      const message =  await this.userService.postVerifyMail(username, generateNumericOTP(5))
      if(message.status ==200)return res.status(STATUS_CODE_OK) .json({success:true, message:"Email sent successfully" })
    } catch (error) {
      res.status(STATUS_CODE_BAD_REQUEST).json({success:false, message: error.message });
    }
  }

  async postOtp(req, res) {
    try {
      const errors = checkError(req)
      if (!errors.isEmpty()) return res.status(STATUS_CODE_BAD_REQUEST).json({success:false, message: errors.mapped() })
      const { username, otp } = req.body
      let message = await this.userService.postOtp(username, otp)
      return res.status(STATUS_CODE_OK).json({success:true, message })
    } catch (error) {
      res.status(STATUS_CODE_BAD_REQUEST).json({success:false, message: error.message });
    }
  }

  async postResetPassword(req, res) {
    try {
      const { username, password, cPassword } = req.body;
      const message = await this.userService.postResetPassword(username, password, cPassword);
      return res.status(STATUS_CODE_OK)

        .json({ success:true,message })
    } catch (error) {
      res.status(STATUS_CODE_BAD_REQUEST).json({success:false, message: error.message });
    } 
  }
}

module.exports = UserController;
