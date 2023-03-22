import TestValidation from "./test.validation.js";
import TestServices from "./test.services.js";

export default class TestController {
    static async create(req, res) {
        try {
            
            const data = TestValidation.postValidation(req);

            return await TestServices.create(data)

        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }
}
