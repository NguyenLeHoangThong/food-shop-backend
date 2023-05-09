import * as yup from 'yup';

export default class ProductsValidation {
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

    static create(req) {
        try {
            const schema = yup.object({
                name: yup.string().required(),
                general_description: yup.string().required(),
                unit_price: yup.number().required(),
                stock: yup.number().required(),
                category_id: yup.number().required(),
                attribute_label: yup.array().of(yup.string()),
                attribute_value: yup.array().of(yup.string()),
                promotion_id: yup.number(),
                note: yup.string(),
                banner: yup.string().required()
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
                general_description: yup.string().required(),
                unit_price: yup.number().required(),
                stock: yup.number().required(),
                category_id: yup.number().required(),
                attribute_label: yup.array().of(yup.string()),
                attribute_value: yup.array().of(yup.string()),
                promotion_id: yup.number(),
                note: yup.string(),
                banner: yup.string()
            })
            return schema.validateSync(req.body);
        } catch (error) {
            throw new Error(error);
        }
    }
}
