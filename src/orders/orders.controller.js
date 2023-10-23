

const { checkError } = require('../../utils/middleware');
const {
    STATUS_CODE_OK,
    STATUS_CODE_BAD_REQUEST,
} = require('../../utils/constant');

class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }


    async postCreateOrder(req, res) {
        try {
            const errors = checkError(req)
            if (!errors.isEmpty()) return res.status(STATUS_CODE_BAD_REQUEST)
                .json({
                    success: false,
                    message: errors.mapped()
                })
            const { amt, item_name } = req.body
            const { user } = req;
            const result = await this.orderService.postCreateOrder(amt, item_name, user)
            return res.status(STATUS_CODE_OK)
                .json({
                    success: true,
                    message: result,
                });
        } catch (error) {
            res.status(STATUS_CODE_BAD_REQUEST)
                .json({
                    success: false,
                    message: error.message
                });
        }
    }

    async getUserOrders(req, res) {
        try {
            const { user } = req;
            const result = await this.orderService.getUserOrders(user)
console.log(result)
            return res.status(STATUS_CODE_OK)
                .json({
                    success: true,
                    message:"user orders found successfully",
                    users:result
                });
        } catch (error) {
            res.status(STATUS_CODE_BAD_REQUEST)
                .json({
                    success: false,
                    message: error.message
                });
        }
    }
   async getUserWithMostOrder(req,res){
        try {
            const result = await this.orderService.getUserWithMostOrder()
             console.log(result)
            return res.status(STATUS_CODE_OK)
                .json({
                    success: true,
                    message:"users orders found successfully",
                    users:result
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

module.exports = OrderController;
