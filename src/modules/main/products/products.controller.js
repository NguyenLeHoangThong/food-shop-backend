import ProductsValidation from "./products.validation.js";
import ProductsServices from "./products.services.js";

const RELATED_PRODUCT_LIMIT = 6;
export default class ProductsController {
    static async findAll(req, res) {
        try {
            const data = ProductsValidation.findAll(req)
            const result = await ProductsServices.findAll(data, req, res)
            return res.json(result)

        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async findById(req, res) {
        try {
            const data = ProductsValidation.findById(req);
            const result = await ProductsServices.findById(data, req, res);

            result.related = await ProductsServices.findRelated(result, RELATED_PRODUCT_LIMIT, req, res);

            return res.json(result);
        } catch (error) {
            return res.status(500).send({
                error: error?.message || error
            });
        }
    }

    static async addToFavorite(req, res) {
        try {
            const data = ProductsValidation.addToFavorite(req);
            const result = await ProductsServices.addToFavorite(data, req, res);

            return result;
        } catch (error) {
            return res.status(500).send({
                error: error?.message || error
            });
        }
    }

    static async removeFromFavorite(req, res) {
        try {
            const data = ProductsValidation.removeFromFavorite(req);
            const result = await ProductsServices.removeFromFavorite(data, req, res);

            return result;
        } catch (error) {
            return res.status(500).send({
                error: error?.message || error
            });
        }
    }

    static async findAllInActivePromotion(req, res) {
        try {
            const results = await ProductsServices.findAllInActivePromotion(req, res);
            return res.json(results);
        } catch (error) {
            return res.status(500).send({
                error: error?.message || error
            });
        }
    }
}
