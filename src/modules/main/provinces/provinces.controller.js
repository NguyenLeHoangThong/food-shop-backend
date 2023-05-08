import ProvincesValidation from "./provinces.validation.js";
import ProvincesServices from "./provinces.services.js";

export default class ProvincesController {
    static async getById(req, res) {
        try {
            return await ProvincesServices.getById(req, res)
        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async getAll(req, res) {
        try {
            return await ProvincesServices.getAll(req, res)
        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }
}
