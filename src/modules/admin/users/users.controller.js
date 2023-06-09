import UsersValidation from "./users.validation.js";
import UsersServices from "./users.services.js";

export default class UsersController {
    static async findAll(req, res) {
        try {
            const data = UsersValidation.findAll(req)
            const result = await UsersServices.findAll(data, req, res)
            return res.json(result)

        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }    
}
