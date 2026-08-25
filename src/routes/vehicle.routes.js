import express from "express";
import auth from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import {registerVehicleValidation} from "../validators/vehicle.validator.js";
import vehicleController from "../controllers/vehicle.controller.js";

const router = express.Router();

router.post(
    "/",
    auth,
    authorize("DRIVER"),
    registerVehicleValidation,
    vehicleController.register
);

router.get(
    "/",
    auth,
    authorize("DRIVER"),
    vehicleController.getVehicle
);

router.put(
    "/",
    auth,
    authorize("DRIVER"),
    registerVehicleValidation,
    vehicleController.updateVehicle
);

export default router;