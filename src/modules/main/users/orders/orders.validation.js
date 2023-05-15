import * as yup from "yup";

export default class OrdersValidation {
    static async create(req) {
        try {
            const schema = yup.object({
                items: yup.array().of(yup.object({
                    product: yup.object({
                        id: yup.number().required(),
                        name: yup.string().required(),
                        unit_price: yup.number().required(),
                        stock: yup.number().required(),
                        category_id: yup.number().notRequired(),
                        general_description: yup.string().notRequired(),
                        attribute_label: yup.string().nullable(true).notRequired(),
                        attribute_value: yup.string().nullable(true).notRequired(),
                        promotion_id: yup.number().nullable(true).notRequired(),
                        note: yup.string().nullable(true).notRequired(),
                        created: yup.string().notRequired(),
                        modified: yup.string().notRequired(),
                        banner: yup.string().notRequired(),
                    }).required(),
                    quantity: yup.number().required(),
                })).required(),
                fullname: yup.string().required(),
                phone: yup.string().required(),
                email: yup.string().notRequired(),
                gender: yup.mixed().oneOf(['MALE', 'FEMALE']).required(),
                province_id: yup.number().required(),
                district_id: yup.number().required(),
                ward_id: yup.number().required(),
                address: yup.string().required(),
                delivery_date: yup.date().required(),
                delivery_timerange_id: yup.number().required(),
                payment_method_id: yup.number().required()
            })
            return schema.validateSync(req.body);
        }
        catch (error) {
            throw new Error(error);
        }
    }
}