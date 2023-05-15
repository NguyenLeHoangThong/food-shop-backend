import OrdersValidation from "./orders.validation.js";
import OrdersServices from "./orders.services.js";

export default class OrdersController {
    static async findAll(req, res) {
        try {
            const data = OrdersValidation.findAll(req)
            const result = await OrdersServices.findAll(data, req, res)
            return res.json(result)

        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }  
    
    static async updateStatus(req, res) {
        try {
            const { id } = req.params
            const data = OrdersValidation.updateStatus(req)
            const result = await OrdersServices.updateStatus(id, data, req, res)

        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }  

}
