import { Router } from "express";
import categoriesController from "./categories.controller.js";

export const categoriesRouter = Router();

categoriesRouter.route('/')
    .get(categoriesController.findAll)
    .post(categoriesController.create)

categoriesRouter.route('/:id')
    .delete(categoriesController.delete)
    .put(categoriesController.update);



