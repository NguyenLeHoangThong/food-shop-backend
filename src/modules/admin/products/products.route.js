import { Router } from "express";
import productsController from "./products.controller.js";

export const productsRouter = Router();


productsRouter.route('/')
    .get(productsController.findAll)
    .post(productsController.create)

productsRouter.route('/:id/status')
    .put(productsController.updateStatus)

productsRouter.route('/:id')
    .put(productsController.update);