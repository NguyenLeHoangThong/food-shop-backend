import { Router } from "express";
import productsController from "./products.controller.js";
import { commentsRouter } from "./comments/comments.route.js";

export const productsRouter = Router();



productsRouter.route('/')
    .get(productsController.findAll);

productsRouter.use('/', commentsRouter)

productsRouter.route('/promotion').get(productsController.findAllInActivePromotion);

productsRouter.route('/:id')
    .get(productsController.findById);

productsRouter.route('/:id/favorite')
    .post(productsController.addToFavorite)
    .delete(productsController.removeFromFavorite);


