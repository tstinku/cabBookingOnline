import express from "express";
import auth from "../middleware/auth.middleware.js";
import controller from "../controllers/driver.controller.js";
import authorize from "../middleware/authorize.middleware.js";
import ROLES from "../common/constants/roles.js"; 
import validateEmpty from "../middleware/validate.middleware.js";  

const router = express.Router();

router.put(
    "/online",
    auth,
    authorize(ROLES.DRIVER),
    validateEmpty,
    controller.goOnline
);

router.put(
    "/offline",
    auth,
    authorize(ROLES.DRIVER),
    validateEmpty,
    controller.goOffline
);

router.put(
    "/location",
    auth,
    authorize(ROLES.DRIVER),
    validateEmpty,
    controller.updateLocation
);

export default router;