import * as yup from 'yup';

export default class ProductsValidation {
    static findAll(req) {
        const schema = yup.object({
            categoryId: yup.number().required()
        })

        try {
            const data = schema.validateSync(req.query);
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    static findById(req) {
        const schema = yup.object({
            id: yup.number().required()
        });

        try {
            const data = schema.validateSync(req.params);
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
}
