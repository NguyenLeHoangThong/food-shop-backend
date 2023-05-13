import { Router } from "express";
import UsersController from "./users.controller.js";

export const usersRouter = Router();


usersRouter.route('/')
    .get(UsersController.findAll)

usersRouter.route('/')
    .post(UsersController.createAdminAccount)