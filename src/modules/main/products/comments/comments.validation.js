import * as yup from 'yup';

export default class CommentsValidation {
    static async newItem(req) {
        try {
            const schema = yup.object({
                user_id: yup.string().required(),
                comment_content: yup.string().required(),
            })
            return schema.validateSync(req.body);

        } catch (error) {
            throw new Error(error);
        }
    }
}