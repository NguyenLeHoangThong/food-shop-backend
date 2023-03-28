import { Router } from "express";
import categoriesController from "./categories.controller.js";

export const categoriesRouter = Router();

categoriesRouter.route('/preview-products')
    .get(categoriesController.previewProducts);


