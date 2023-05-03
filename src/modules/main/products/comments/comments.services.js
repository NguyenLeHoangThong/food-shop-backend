import { getConnection } from '../../../../utils/connectDatabase.js';

export default class CommentsServices {
    static async getRepliesByCommentId(req, res) {
        try {
            const client = await getConnection()

            var results = await client.select(['1.fullname', '0.comment_content', 'created'])
                .from(['comment_replies', 'users'])
                .where('0.comment_id', '=', req.params.c_id)
                .andWhere('1.id', '=', client.ref('0.id'))
            return results

        } catch (error) {

            return res.status(500).send(({
                error: error?.message || error
            }));
        }
    }

    static async newReply(data, req, res) {
        try {
            const client = await getConnection()
            const result = await client.transaction(async (trx) => {
                try {
                    data.comment_id = req.params.c_id
                    const result = await trx('comment_replies')
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

            return result
        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }));
        }
    }

    static async newComment(data, req, res) {
        try {

            const client = await getConnection()
            const result = await client.transaction(async (trx) => {
                try {
                    data.product_id = req.params.id
                    const result = await trx('product_comments')
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

            return result
        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }));
        }
    }


    static async getCommentByProductId(req, res) {
        try {
            const client = await getConnection()

            var results = await client.select(['0.id', '1.fullname', '0.comment_content', '0.created'])
                .from(['product_comments ', 'users'])
                .where('0.product_id', '=', req.params.id)
                .andWhere('1.id', '=', client.ref('0.user_id'))
                .then(async comments => {
                    for (var comment of comments) {
                        var replies = await client.select(['1.fullname', '0.comment_content', '0.created'])
                            .from(['comment_replies', 'users'])
                            .where('0.comment_id', '=', comment.id)
                            .andWhere('1.id', '=', client.ref('0.user_id'))
                        comment.replies = replies
                    }
                    return comments
                })

            return results;
        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }));
        }
    }

}