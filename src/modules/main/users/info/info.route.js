import { Router } from "express";
import InfoController from "./info.controller.js";

export const infoRouter = Router();

infoRouter.route("/:uid").get(InfoController.findByUid);
infoRouter.route("/:uid").put(InfoController.update);
infoRouter.route("/").post(InfoController.create);

