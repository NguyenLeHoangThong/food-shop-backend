import { Router } from "express";
import { testRouter } from "./test/test.route.js";

export const mainRouter = Router();

mainRouter.use('/test', testRouter);
