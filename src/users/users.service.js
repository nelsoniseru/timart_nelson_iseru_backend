const bcrypt = require('bcryptjs');
const User = require('./users.model');
const  {SendMail} = require("../../utils/email")

/* eslint-disable class-methods-use-this */
const {
    generateToken,
    hashPassword,
 
} = require("../../utils/middleware")
class UserService {
    sayHello() {
        return "hello world"
    }

    async postLogin(username, password) {
        const user = await User.findOne({ username })
        if (!user) throw new Error(`Invalid email or password..`);
        if (!(await bcrypt.compare(password, user.password))) throw new Error(`Invalid email or password.`);
        return await generateToken(user)
    }

    async getProfile(user) {
        return await User.findOne({ _id: user.id })
    }

    async postVerifyMail(username, otp) {
        const user = await User.findOne({ username })
        if (!user) throw new Error(`User does not exist`);
     
        const mailData = {
            from: `tezz08@gmail.com`,
            to: `${username}`,
            subject: `Forgot Password`,
            text: `Dear User your otp: ${otp}`,
          };
          // Send the email
          return SendMail(mailData)
         
        }
    

    async postOtp(username, otp) {
        const user = await User.findOne({ username });
        if (!user) throw new Error(`User does not exist.`);
        if (user.otp !== otp) throw new Error(`Incorrect otp.`);
        user.otp = ""
        await user.save()
        return "Successful Otp"
    }



    async postResetPassword(username, password, c_password) {
        const user = await User.findOne({ username })
        if (user) throw new Error(`User does not exist.`);
        if (password !== c_password) throw new Error(`Password does not match.`);
        user.password = await hashPassword(password)
        await user.save()
        return "Password changed successfully"
    }
}
module.exports = UserService;
