const { Sequelize, DataTypes, Model } = require('sequelize')
const AppConfig = require('../../utils/config')
const config = new AppConfig();
const sequelize = config.getSequelizeInstance();
class Order extends Model { }
Order.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    item_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    transaction_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    order_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    sequelize,
    modelName: 'Order'
})



module.exports = Order
