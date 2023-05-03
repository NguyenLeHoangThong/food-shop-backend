import PromotionsValidation from "./promotions.validation.js";
import PromotionsServices from "./promotions.services.js";

export default class PromotionsController {
    static async findAll(req, res) {
        try {
            const data = PromotionsValidation.findAll(req)
            const result = await PromotionsServices.findAll(data, req, res)
            return res.json(result)

        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async findActivePromotions(req, res) {
        try {
            const result = await PromotionsServices.findActivePromotions(req, res)
            return res.json(result)

        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async create(req, res) {
        try {
            const data = PromotionsValidation.create(req)
            const result = await PromotionsServices.create(data, req, res)

        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params
            const data = PromotionsValidation.update(req)
            const result = await PromotionsServices.update(id, data, req, res)

        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params
            const result = await PromotionsServices.delete(id, req, res)
            
        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }
}
