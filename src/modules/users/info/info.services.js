import { getConnection } from '../../../utils/connectDatabase.js';

export default class InfoServices {
    static async findByUid(req, res) {
        try {
            const client = await getConnection();

            const results = await client.select()
                .from('users')
                .where('users.firebase_uid', '=', req.params.uid);

            return results && results.length ? results[0] : {};
        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }));
        }
    }

    static async create(data, req, res) {
        try {
            const client = await getConnection();

            return await client
                .transaction(async (trx) => {
                    try {
                        const results = await trx('users')
                            .insert(data).returning('id')

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

        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async update(uid, data, req, res) {
        try {
            const client = await getConnection();

            return await client
                .transaction(async (trx) => {
                    try {
                        const results = await trx('users')
                            .update(data)
                            .where('firebase_uid', '=', uid)

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
