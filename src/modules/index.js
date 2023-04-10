import { Router } from "express";
import { mainRouter } from "./main/index.js";
import { adminRouter } from "./admin/index.js";
import { usersRouter } from "./users/index.js";

export const router = Router();

router.use('/', mainRouter);
router.use('/admin', adminRouter);
router.use('/users', usersRouter);
