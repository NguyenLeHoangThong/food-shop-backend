import { getConnection } from '../../../utils/connectDatabase.js';

export default class UsersServices {
    static async findAll(data, req, res) {
        try {
            const client = await getConnection();
            if (data.keyword) {
                try {
                    const results = await client.raw(`Select * From Users WHERE LOWER(fullname) like N'%${data.keyword.toLowerCase()}%'`)
                    return results && results.rows.length ? results.rows : [];
                } catch (error) {
                    return res.status(500).send(({
                        error: error?.message || error
                    }));
                }
            }
            else {
                try {
                    const results = await client.raw('Select * From Users')

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

    static async createAdminAccount(data, req, res) {
        try {
            const client = await getConnection();

            const user_check = await client.select('users.id').from('users').where('users.firebase_uid', '=', data.firebase_uid);
            if (user_check && user_check.length) throw Error("account existed")

            return await client
                .transaction(async (trx) => {
                    try {
                        const results = await trx('users')
                            .insert({
                                ...data,
                                authority: 'ADMIN'
                            }).returning('id')

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
}
