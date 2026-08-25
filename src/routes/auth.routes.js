import express from "express";
import controller from "../controllers/auth.controller.js";
import { registerValidation, loginValidation } from "../validators/auth.validator.js";

const router = express.Router();

router.post(
    "/register",
    registerValidation,
    controller.register
);

router.post(
    "/login",
    loginValidation,
    controller.login
);

export default router;