import { Router } from "express";
import { infoRouter } from "./info/info.route.js";
import { ordersRouter } from "./orders/orders.route.js";

export const usersRouter = Router();

usersRouter.use('/', infoRouter, ordersRouter);