import { getConnection } from '../../../utils/connectDatabase.js';

export default class ProductsServices {
    static async findAll(data, req, res) {
        try {
            const client = await getConnection();

            if (data.categoryId) {
                try {
                    const results = await client
                        .select('products.*', 'promotions.sale_percent')
                        .from('products')
                        .leftJoin('promotions', 'products.promotion_id', 'promotions.id')
                        .where(`products.category_id`, '=', data.categoryId)
                        .where('products.status', '=', 'ACTIVE')
                    return results && results.length ? results : []
                } catch (error) {
                    return res.status(500).send(({
                        error: error?.message || error
                    }));
                }
            }
            else if (data.keyword) {
                try {
                    const results = await client.raw(`Select products.*, sale_percent From products left join promotions on products.promotion_id = promotions.id WHERE LOWER(products.name) like N'%${data.keyword.toLowerCase()}%' and products.status = 'ACTIVE'`)
                    return results && results.rows.length ? results.rows : [];
                } catch (error) {
                    console.log(error);
                    return res.status(500).send(({
                        error: error?.message || error
                    }));
                }
            }
            else if (data.favorite) {
                try {
                    // need to add sale_percent
                    const result = await client.select('0.*')
                        .from(['products', 'user_favorite_products'])
                        .where('1.user_id', '=', data.favorite)
                        .where('products.status', '=', 'ACTIVE')
                        .andWhere('0.id', client.ref('1.product_id'))
                    return result
                }
                catch (error) {
                    return res.status(500).send(({
                        error: error?.message || error
                    }));
                }
            }
            else {
                try {
                    const results = await client.select('products.*', 'promotions.sale_percent')
                        .from('products')
                        .leftJoin('promotions', 'products.promotion_id', 'promotions.id')
                        .where('products.status', '=', 'ACTIVE')

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

    static async findById(data, req, res) {
        try {
            const client = await getConnection();

            const results = await client.select('products.*', 'promotions.sale_percent')
                .from('products')
                .leftJoin('promotions', 'products.promotion_id', 'promotions.id')
                .where('products.id', '=', req.params.id)
                .where('products.status', '=', 'ACTIVE');

            if (results && results.length && data.favorite) {
                var check = await client.select()
                    .from("user_favorite_products")
                    .where("user_favorite_products.product_id", "=", results[0].id)
                    .andWhere("user_favorite_products.user_id", "=", data.favorite)
                results[0].favorite = Boolean(check && check.length)
            }

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
            const results = await client.select('products.*', 'promotions.sale_percent')
                .from('products')
                .leftJoin('promotions', 'products.promotion_id', 'promotions.id')
                .where('products.category_id', '=', data.category_id)
                .where('products.status', '=', 'ACTIVE')
                .andWhere('products.id', '<>', data.id)
                .limit(limit);

            return results && results.length ? results : [];
        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }));
        }
    }

    static async addToFavorite(data, req, res) {
        try {
            const client = await getConnection();

            return await client
                .transaction(async (trx) => {
                    try {
                        data.product_id = req.params.id
                        const result = await trx('user_favorite_products')
                            .insert(data)


                        return res.status(201).send({
                            message: "Create successfully"
                        })
                    }
                    catch (e) {
                        return res.status(500).send({
                            message: e?.message || e
                        })
                    }
                })
        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }));
        }
    }

    static async removeFromFavorite(data, req, res) {
        try {
            const client = await getConnection();

            return await client
                .transaction(async (trx) => {
                    try {
                        const result = await trx('user_favorite_products')
                            .where('user_favorite_products.product_id', '=', req.params.id)
                            .andWhere('user_favorite_products.user_id', '=', data.user_id)
                            .del()


                        return res.status(204).send({
                            message: "Delete successfully"
                        })
                    }
                    catch (e) {
                        return res.status(500).send({
                            message: e?.message || e
                        })
                    }
                })
        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }));
        }
    }

    static async searchByText(data, req, res) {
        try {
            const client = await getConnection();
            const results = await client.select('products.*', 'promotions.sale_percent')
                .from('products')
                .leftJoin('promotions', 'products.promotion_id', 'promotions.id')
                .where('name', 'like', `%${data?.keyword}%`)
                .where('products.status', '=', 'ACTIVE')

            return results && results.length ? results : [];
        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }));
        }
    }
}
