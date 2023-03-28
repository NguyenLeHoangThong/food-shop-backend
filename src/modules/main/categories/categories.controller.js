import CategoriesValidation from "./categories.validation.js";
import CategoriesServices from "./categories.services.js";

export default class CategoriesController {
    static async previewProducts(req, res) {
        try {
            
            const result = await CategoriesServices.previewProducts(req, res)
            return res.json(result)

        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }
}
