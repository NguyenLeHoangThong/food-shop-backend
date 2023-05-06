import * as yup from 'yup';

export default class InfoValidation {
    static async create(req) {
        try {
            const schema = yup.object({
                firebase_uid: yup.number().required(),
                email: yup.string().nullable().notRequired(),
                fullname: yup.string().nullable().notRequired(),
                phone_number: yup.string().nullable().notRequired(),
                gender: yup.mixed().oneOf(['MALE', 'FEMALE', null]).notRequired(),
                province_id: yup.number().nullable().notRequired(),
                district_id: yup.number().nullable().notRequired(),
                ward_id: yup.number().nullable().notRequired(),
                address: yup.string().nullable().notRequired(),
                authority: yup.mixed().oneOf(['ADMIN', 'CUSTOMER']).notRequired(),
            })
            return schema.validateSync(req.body);
        }
        catch (error) {
            throw new Error(error);
        }
    }

    static async update(req) {
        try {
            const schema = yup.object({
                email: yup.string().notRequired(),
                fullname: yup.string().notRequired(),
                phone_number: yup.string().notRequired(),
                gender: yup.mixed().oneOf(['MALE', 'FEMALE']),
                province_id: yup.number().notRequired(),
                district_id: yup.number().notRequired(),
                ward_id: yup.number().notRequired(),
                address: yup.string().notRequired(),
                authority: yup.mixed().oneOf(['ADMIN', 'CUSTOMER']).required(),
            })
            return schema.validateSync(req.body);
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
