import * as yup from 'yup';

export default class PromotionsValidation {
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
                sale_percent: yup.number().required(),
                start_time: yup.date().required(),
                end_time: yup.date().required(),
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
                sale_percent: yup.number().required(),
                start_time: yup.date().required(),
                end_time: yup.date().required(),
            })
            return schema.validateSync(req.body);
        } catch (error) {
            throw new Error(error);
        }
    }
}
