import OrdersValidation from "./orders.validation.js";
import OrdersServices from "./orders.services.js";

export default class OrdersController {
	static async findAllFromUid(req, res) {
		try {
			const { uid } = req.params
			const result = await OrdersServices.findAllFromUid(uid, req, res);
			return res.json(result);
		} catch (error) {
			return res.status(500).send({
				error: error?.message || error,
			});
		}
	}

	static async create(req, res) {
		try {
			const { uid } = req.params
			const data = await OrdersValidation.create(req)
			const result = await OrdersServices.create(uid, data, req, res);
			return result;
		} catch (error) {
			return res.status(500).send({
				error: error?.message || error,
			});
		}
	}
}
