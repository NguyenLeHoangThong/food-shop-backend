import { Router } from "express";
import { categoriesRouter } from "./categories/categories.route.js";

export const adminRouter = Router();

adminRouter.use('/categories', categoriesRouter);
