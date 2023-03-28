import { Router } from "express";
import productsController from "./products.controller.js";

export const productsRouter = Router();

productsRouter.route('/')
    .get(productsController.findAll);


