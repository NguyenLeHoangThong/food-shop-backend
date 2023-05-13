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

    static async createAdminAccount(req) {
        try {
            const schema = yup.object({
                firebase_uid: yup.string().required(),
                email: yup.string().nullable().notRequired(),
            })
            return schema.validateSync(req.body);
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
