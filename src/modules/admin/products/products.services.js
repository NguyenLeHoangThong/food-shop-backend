import { getConnection } from '../../../utils/connectDatabase.js';

export default class ProductsServices {
    static async findAll(data, req, res) {
        try {
            const client = await getConnection();
            if (data.keyword) {
                try {
                    const results = await client.raw(`Select products.*, categories.name as category_name From products Inner Join categories on products.category_id = categories.id WHERE LOWER(name) like N'%${data.keyword.toLowerCase()}%'`)
                    return results && results.rows.length ? results.rows : [];
                } catch (error) {
                    return res.status(500).send(({
                        error: error?.message || error
                    }));
                }
            }
            else {
                try {
                    const results = await client.raw('Select products.*, categories.name as category_name From products Inner Join categories on products.category_id = categories.id Order by products.id ASC')

                    return results && results.rows.length ? results.rows : [];
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


    static async create(data, req, res) {
        try {
            const client = await getConnection();

            return await client
                .transaction(async (trx) => {
                    try {
                        const results = await trx('products')
                            .insert(data)

                        return res.status(200).send({
                            message: "Create successfully"
                        })
                    }
                    catch (e) {
                        return res.status(500).send({
                            message: e?.message || e
                        })
                    }
                })

        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async update(id, data, req, res) {
        try {
            const client = await getConnection();

            return await client
                .transaction(async (trx) => {
                    try {
                        const results = await trx('products')
                            .update(data)
                            .where('id', '=', id)

                        return res.status(200).send({
                            message: "Update successfully"
                        })
                    }
                    catch (e) {
                        return res.status(500).send({
                            message: e?.message || e
                        })
                    }
                })

        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async updateStatus(id, data, req, res) {
        try {
            const client = await getConnection();

            return await client
                .transaction(async (trx) => {
                    try {
                        const results = await trx('products')
                            .update({
                                status: !!data?.active ? 'ACTIVE' : 'INACTIVE'
                            })
                            .where('id', '=', id)

                        return res.status(200).send({
                            message: "Update successfully"
                        })
                    }
                    catch (e) {
                        return res.status(500).send({
                            message: e?.message || e
                        })
                    }
                })

        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }
}
