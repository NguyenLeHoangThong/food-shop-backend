import { Router } from "express";
import ProvincesController from "./provinces.controller.js";

export const provincesRouter = Router();

provincesRouter.route('/:id')
    .get(ProvincesController.getById);

provincesRouter.route('/')
    .get(ProvincesController.getAll)


