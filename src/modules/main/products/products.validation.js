import * as yup from 'yup';

export default class ProductsValidation {
    static findAll(req) {
        const schema = yup.object({
            categoryId: yup.number().required()
        })

        try {
            return schema.validateSync(req.query);
        } catch (error) {
            throw new Error(error);
        }
    }

    static findById(req) {
        const schema = yup.object({
            id: yup.number().required()
        });

        try {
            return schema.validateSync(req.params);
        } catch (error) {
            throw new Error(error);
        }
    }
}
