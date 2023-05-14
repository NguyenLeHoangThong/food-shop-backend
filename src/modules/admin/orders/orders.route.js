import { Router } from "express";
import OrdersController from "./orders.controller.js";

export const ordersRouter = Router();


ordersRouter.route('/')
    .get(OrdersController.findAll)

ordersRouter.route('/status')
    .put(OrdersController.updateStatus)

ordersRouter.route('/ispaid')
    .put(OrdersController.updateIsPaid)