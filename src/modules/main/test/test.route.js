import { Router } from "express";
import testController from "./test.controller.js";

export const testRouter = Router();

testRouter.route('/')
    .post(testController.create);


