import { Router } from "express";
import { categoriesRouter } from "./categories/categories.route.js";
import { productsRouter } from "./products/products.route.js";
import { promotionsRouter } from "./promotions/promotions.route.js";
import { usersRouter } from "./users/users.route.js";

export const adminRouter = Router();

adminRouter.use('/categories', categoriesRouter);
adminRouter.use('/products', productsRouter);
adminRouter.use('/promotions', promotionsRouter);
adminRouter.use('/users', usersRouter);
