import * as yup from 'yup';

export default class UsersValidation {
    static findAll(req) {
        const schema = yup.object({
            keyword: yup.string().notRequired()
        })

        try {
            return schema.validateSync(req.query);
        } catch (error) {
            throw new Error(error);
        }
    }

    static updateStatus(req) {
        const schema = yup.object({
            status: yup.string().required()
        })

        try {
            return schema.validateSync(req.body);
        } catch (error) {
            throw new Error(error);
        }
    }

    static updateIsPaid(req) {
        const schema = yup.object({
            is_paid: yup.boolean().notRequired()
        })

        try {
            return schema.validateSync(req.body);
        } catch (error) {
            throw new Error(error);
        }
    }
}
