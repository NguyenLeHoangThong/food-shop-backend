import { Router } from "express";
import LocationController from "./location.controller.js";

export const locationRouter = Router();

// provincesRouter.route('/:id')
//     .get(LocationController.getById);

// provincesRouter.route('/')
//     .get(LocationController.getAll)


locationRouter.route('/provinces').get(LocationController.getProvincesList)
locationRouter.route('/districts').get(LocationController.getDistrictsList)
locationRouter.route('/wards').get(LocationController.getWardsList)

