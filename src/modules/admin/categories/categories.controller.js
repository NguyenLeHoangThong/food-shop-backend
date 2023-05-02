import CategoriesValidation from "./categories.validation.js";
import CategoriesServices from "./categories.services.js";

export default class CategoriesController {
    static async findAll(req, res) {
        try {
            
            const result = await CategoriesServices.findAll(req, res)
            return res.json(result)

        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async create(req, res) {
        try {
            const data = CategoriesValidation.create(req)
            const result = await CategoriesServices.create(data, req, res)
            return res.status(200).send({
                message: "Create successfully"
            })

        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params
            const data = CategoriesValidation.update(req)
            const result = await CategoriesServices.update(id, data, req, res)
            return res.status(200).send({
                message: "Update successfully"
            })
        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params
            const result = await CategoriesServices.delete(id, req, res)
            
        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }
}
