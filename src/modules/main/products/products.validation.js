import * as yup from 'yup';

export default class ProductsValidation {
    static findAll(req) {
        const schema = yup.object({
            categoryId: yup.number().notRequired(),
            keyword: yup.string().notRequired(),
            favorite: yup.string().notRequired(),
        })

        try {
            return schema.validateSync(req.query);
        } catch (error) {
            throw new Error(error);
        }
    }

    static findById(req) {
        const schema = yup.object({
            favorite: yup.string().notRequired()
        });

        try {
            return schema.validateSync(req.query);
        } catch (error) {
            throw new Error(error);
        }
    }

    static addToFavorite(req) {
        const schema = yup.object({
            user_id: yup.string().required()
        });

        try {
            return schema.validateSync(req.body);
        } catch (error) {
            throw new Error(error);
        }
    }

    static removeFromFavorite(req) {
        const schema = yup.object({
            user_id: yup.string().required()
        });

        try {
            return schema.validateSync(req.query);
        } catch (error) {
            throw new Error(error);
        }
    }
}
