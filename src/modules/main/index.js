import { Router } from "express";
import { testRouter } from "./test/test.route.js";
import { categoriesRouter } from "./categories/categories.route.js";
import { productsRouter } from "./products/products.route.js";
import { usersRouter } from "./users/index.js";

export const mainRouter = Router();

mainRouter.use('/users', usersRouter)
mainRouter.use('/categories', categoriesRouter);
mainRouter.use('/products', productsRouter);
