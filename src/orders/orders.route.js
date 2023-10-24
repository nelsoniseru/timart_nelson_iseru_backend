const {
    orders,
} = require('../../utils/constant');

const {
    validateOrderInput,
} = require('../../utils/validation');

const {
    authenticateToken,
} = require('../../utils/middleware');

const OrderController = require('./orders.controller');
const OrderService = require('./orders.service');

const orderService = new OrderService();
const orderController = new OrderController(orderService);
class OrderRoutes {
    constructor(app) {
        this.app = app;
        this.orderController = orderController;
    }

    async routes() {
        this.app.post(`${orders}/create-order`, authenticateToken, validateOrderInput, (req, res) => orderController.postCreateOrder(req, res));
        this.app.get(`${orders}/get-user-order`, authenticateToken, (req, res) => orderController.getUserOrders(req, res));
        this.app.get(`${orders}/get-most-orders`, (req, res) => orderController.getUserWithMostOrder(req, res));
    }
}

module.exports = OrderRoutes;
