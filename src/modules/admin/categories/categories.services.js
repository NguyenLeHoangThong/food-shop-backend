import { getConnection } from '../../../utils/connectDatabase.js';

export default class CategoriesServices {
    static async findAll(req, res) {
        try {
            const client = await getConnection();

            const results = await client
                .select()
                .from('categories')

            return results && results.length ? results : []
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
                        const results = await trx('categories')
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
                        const results = await trx('categories')
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
}
