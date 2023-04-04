import { getConnection } from '../../../utils/connectDatabase.js';

export default class ProductsServices {
    static async findAll(data, req, res) {
        try {
            const client = await getConnection();

            if (data.categoryId) {
                try {
                    const results = await client
                        .select()
                        .from('products')
                        .where(`products.category_id`, '=', data.categoryId)
                    return results && results.length ? results : []
                } catch (error) {
                    return res.status(500).send(({
                        error: error?.message || error
                    }));
                }
            }
            else if (data.keyword) {
                try {
                    const results = await client.raw(`Select * From products WHERE LOWER(name) like N'%${data.keyword}%'`)
                    return results && results.rows.length ? results.rows : [];
                } catch (error) {
                    return res.status(500).send(({
                        error: error?.message || error
                    }));
                }
            }
            else {
                try {
                    const results = await client.select()
                        .from('products')

                    return results && results.length ? results : [];
                } catch (error) {
                    return res.status(500).send(({
                        error: error?.message || error
                    }));
                }
            }

        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async findById(req, res) {
        try {
            const client = await getConnection();

            const results = await client.select()
                .from('products')
                .where('products.id', '=', req.params.id);

            return results && results.length ? results[0] : {};
        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }));
        }
    }

    static async findRelated(data, limit, req, res) {
        try {
            const client = await getConnection();
            const results = await client.select()
                .from('products')
                .where('products.category_id', '=', data.category_id)
                .andWhere('products.id', '<>', data.id)
                .limit(limit);

            return results && results.length ? results : [];
        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }));
        }
    }

    static async searchByText(data, req, res) {
        try {
            const client = await getConnection();
            const results = await client.select()
                .from('products')
                .where('name', 'like', `%${data?.keyword}%`)

            return results && results.length ? results : [];
        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }));
        }
    }
}
