import { getConnection } from '../../../utils/connectDatabase.js';

export default class ProductsServices {
    static async findAll(data, req, res) {
        try {
            const client = await getConnection();

            const results = await client
                .select()
                .from('products')
                .where(`products.category_id`, '=', data.categoryId)

            return results && results.length ? results : []
        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async findById(data, req, res) {
        try {
            const client = await getConnection();

            const results = await client.select()
                .from('products')
                .where('products.id', '=', data.id);

            return results && results.length ? results[0] : {};
        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }));
        }
    }
}
