import CommentsValidation from "./comments.validation.js";
import CommentsServices from "./comments.services.js";

export default class CommentsController {
    static async getRepliesByCommentId(req, res) {
        try {
            const result = await CommentsServices.getRepliesByCommentId(req, res)
            return res.json(result);
        } catch (error) {
            return res.status(500).send({
                error: error?.message || error
            });
        }
    }

    static async newReply(req, res) {
        try {
            const data = await CommentsValidation.newItem(req)
            const result = await CommentsServices.newReply(data, req, res)
            return result;
        } catch (error) {
            return res.status(500).send({
                error: error?.message || error
            });
        }
    }

    static async newComment(req, res) {
        try {
            const data = await CommentsValidation.newItem(req)

            const result = await CommentsServices.newComment(data, req, res)
            return result;
        } catch (error) {
            return res.status(500).send({
                error: error?.message || error
            });
        }
    }

    static async getCommentsByProductId(req, res) {
        try {
            const result = await CommentsServices.getCommentByProductId(req, res)
            return res.json(result);
        } catch (error) {
            return res.status(500).send({
                error: error?.message || error
            });
        }
    }
}