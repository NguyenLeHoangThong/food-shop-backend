import * as yup from 'yup';

export default class TestValidation {
    static create(req) {
        const data = req?.body;

        const schema = yup.object({
            id: yup.number(),
            name: yup.string().required(),
            description: yup.string(),
            muscleGroup: yup.array().of(yup.string()),
        })
            .noUnknown()

        return schema.validateSync(data)
    }
}
