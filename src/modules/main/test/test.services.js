import { getConnection } from '../../../utils/connectDatabase.js';

export default class TestServices {
    static async create(data) {
        try {
            const client = await getConnection();

            return await client.transaction(async (trx) => { // remember to use transaction for INSERT, UPDATE, DELETE
                try {
                    const results = await trx('table_name')
                        .insert(data)
                        .returning(client.raw("id, name, description, muscle_group::varchar[] AS muscle_group")) // enum parse to JSON

                    return res.status(200).send(results && results.length ? results[0] : null);
                }
                catch (e) {
                    return res.status(404).send({
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
