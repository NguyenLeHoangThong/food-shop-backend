import * as yup from 'yup';

export default class ProductsValidation {
    static findAll(req) {
        const schema = yup.object({
            categoryId: yup.number().required()
        })

        return schema.validateSync(req.query)
    }
}
