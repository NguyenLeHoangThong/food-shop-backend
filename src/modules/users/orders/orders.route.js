import { Router } from "express";
import OrdersController from "./orders.controller.js";

export const ordersRouter = Router();

ordersRouter.route("/:uid/orders").get(OrdersController.findAllFromUid)
ordersRouter.route("/:uid/orders").post(OrdersController.create)