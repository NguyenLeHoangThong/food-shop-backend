import ProductsValidation from "./products.validation.js";
import ProductsServices from "./products.services.js";

export default class ProductsController {
    static async findAll(req, res) {
        try {
            const data = ProductsValidation.findAll(req)
            const result = await ProductsServices.findAll(data, req, res)
            return res.json(result)

        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async findActivePromotions(req, res) {
        try {
            const result = await ProductsServices.findActivePromotions(req, res)
            return res.json(result)

        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async create(req, res) {
        try {
            const data = ProductsValidation.create(req)
            const result = await ProductsServices.create(data, req, res)

        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params
            const data = ProductsValidation.update(req)
            const result = await ProductsServices.update(id, data, req, res)

        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async updateStatus(req, res) {
        try {
            const { id } = req.params
            const data = ProductsValidation.updateStatus(req)
            const result = await ProductsServices.updateStatus(id, data, req, res)
            
        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }
}
