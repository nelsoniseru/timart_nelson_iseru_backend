const bcrypt = require('bcryptjs');
const User = require('./users.model');

const {
    generateToken,
    hashPassword,
 
} = require("../../utils/middleware")
class UserService {
    sayHello() {
        return "hello world"
    }
    async getAllUsers(req, res) {
        return await User.findAll({})
    }
    async postRegister(username,email,password) {
        const findUser = await User.findOne({ where:{email:email}})
        if (findUser) throw new Error(`User already exist.`);
        const HashedPassword = await hashPassword(password)
       const newUser = await User.create({
            email,
            password:HashedPassword,
            username
        })
        return {
            id:newUser.id,
            message:"User created successfully",
            token: await generateToken(newUser)
        }
    }
    async postLogin(email, password) {
        const user = await User.findOne({ where:{email:email} })
        if (!user) throw new Error(`Invalid email or password..`);
        if (!(await bcrypt.compare(password, user.password))) throw new Error(`Invalid email or password.`);
        return {
            id:user.id,
            token:await generateToken(user)
        }
    }

    async getUser(id) {
        const user = await User.findOne({ where:{id:id} })
        if (!user) throw new Error(`User not found..`);
        return await User.findOne({ where:{id:id} })
    }

 
      async postDeposit(amt, user) {
        const findUser = await User.findOne({ where: { email: user.email } });
      
        if (!findUser) {
          throw new Error(`user doesnt exist.`);
        }
        findUser.wallet = parseFloat(findUser.wallet) + parseFloat(amt)
        findUser.save()
        return findUser
      }

}
module.exports = UserService;
