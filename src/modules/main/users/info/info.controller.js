import InfoServices from "./info.services.js";
import InfoValidation from "./info.validation.js";

export default class InfoController {
    static async findByUid(req, res) {
        try {
            var result = await InfoServices.findByUid(req, res)
            return res.json(result);
        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }
    static async create(req, res) {
        try {
            var data = await InfoValidation.create(req);
            var result = await InfoServices.create(data, req, res);
            return result;
        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async update(req, res) {
        try {
            var data = await InfoValidation.update(req);
            var { uid } = req.params
            var result = await InfoServices.update(uid, data, req, res);
            return result;
        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

}
