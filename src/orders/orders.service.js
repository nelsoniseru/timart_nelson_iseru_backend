


const User = require('../users/users.model');
const Order = require('../orders/orders.model');

const {
    generateToken,
    hashPassword,
    generateTransactionId
} = require("../../utils/middleware")

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    port:process.env.DB_PORT

  });
class OrderService {

    async postCreateOrder(amt, item_name, user) {
        const findUser = await User.findOne({ where: { email: user.email } })
        if (!findUser) throw new Error(`User doesnt exist.`);
        if (findUser.wallet < amt) throw new Error(`Insufficient funds.`);
        findUser.wallet = parseFloat(findUser.wallet) - parseFloat(amt)
        await findUser.save()
        await Order.create({
            total_amount: amt,
            userId: findUser.id,
            item_name: item_name,
            transaction_id: generateTransactionId(),
            order_date: Date.now()
        })
        return "Order placed successfully"
    }

    async getUserOrders(user) {
        const findUser = await User.findOne({ where: { email: user.email } });
        if (!findUser) throw new Error(`User doesnt exist.`);
        let result = await Order.findAndCountAll({
            where: { userId: findUser.id },
            include: [{
                model: User,
            }],
        })
        if (!findUser) throw new Error('Invalid user.')
        if (result.count <= 0) throw new Error('no records found.')
        return result
    }
    async getUserWithMostOrder(){
  return await  User.findAll({
            attributes: [
            'id',
             'username',
             [sequelize.literal('(SELECT COUNT(*) FROM Orders WHERE Orders.UserId = User.id)'), 'order_count']
        ],
            
            group: ['User.id'],
            order: sequelize.literal('order_count DESC'),
            limit: 10,
          })

    }
  
}

module.exports = OrderService;
 

