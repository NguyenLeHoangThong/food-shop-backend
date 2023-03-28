import { Router } from "express";
import { testRouter } from "./test/test.route.js";
import { categoriesRouter } from "./categories/categories.route.js";
import { productsRouter } from "./products/products.route.js";

export const mainRouter = Router();

mainRouter.use('/categories', categoriesRouter);
mainRouter.use('/products', productsRouter);
