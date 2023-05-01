import { Router } from "express";
import commentsController from "./comments.controller.js";

export const commentsRouter = Router();

commentsRouter.route("/:id/comments/:c_id").get(commentsController.getRepliesByCommentId)
commentsRouter.route("/:id/comments/:c_id").post(commentsController.newReply)
commentsRouter.route("/:id/comments").get(commentsController.getCommentsByProductId)
commentsRouter.route("/:id/comments").post(commentsController.newComment)