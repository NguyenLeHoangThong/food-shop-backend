import { getConnection } from '../../../utils/connectDatabase.js';

export default class PromotionsServices {
    static async findAll(data, req, res) {
        try {
            const client = await getConnection();
            if (data.keyword) {
                try {
                    const results = await client.raw(`Select * From promotions WHERE LOWER(name) like N'%${data.keyword.toLowerCase()}%'`)
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
                        .from('promotions')

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

    static async findActivePromotions(data, req, res) {
        try {
            const client = await getConnection();
            try {
                const results = await client.select()
                    .from('promotions')
                    .whereRaw('end_time >= now() and start_time <= now()')

                return results && results.length ? results : [];
            } catch (error) {
                return res.status(500).send(({
                    error: error?.message || error
                }));
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
                        const results = await trx('promotions')
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
                        const results = await trx('promotions')
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

    static async delete(id, req, res) {
        try {
            const client = await getConnection();

            return await client
                .transaction(async (trx) => {
                    try {
                        const results = await trx('promotions')
                            .delete()
                            .where('id', '=', id)

                        return res.status(200).send({
                            message: "Delete successfully"
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
