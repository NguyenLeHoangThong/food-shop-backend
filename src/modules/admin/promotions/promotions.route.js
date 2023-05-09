import { Router } from "express";
import promotionsController from "./promotions.controller.js";

export const promotionsRouter = Router();


promotionsRouter.route('/')
    .get(promotionsController.findAll)
    .post(promotionsController.create)

promotionsRouter.route('/active')
    .get(promotionsController.findActivePromotions)

promotionsRouter.route('/:id')
    .delete(promotionsController.delete)
    .put(promotionsController.update);