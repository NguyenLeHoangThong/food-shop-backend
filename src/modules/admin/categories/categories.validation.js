import * as yup from 'yup';

export default class CategoriesValidation {
    static create(req) {
        try {
            const schema = yup.object({
                name: yup.string().required(),
                description: yup.string().notRequired()
            })
            return schema.validateSync(req.body);
        } catch (error) {
            throw new Error(error);
        }
    }

    static update(req) {
        try {
            const schema = yup.object({
                name: yup.string().required(),
                description: yup.string().notRequired()
            })
            return schema.validateSync(req.body);
        } catch (error) {
            throw new Error(error);
        }
    }
}
