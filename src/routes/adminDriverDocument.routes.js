import express from "express";
import controller from "../controllers/adminDriverDocument.controller.js";
import auth from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

const router = express.Router();

/*
 * Get all pending documents
 */
router.get(

    "/pending",

    auth,

    authorize("ADMIN"),

    controller.getPendingDocuments

);


/*
 * Get documents for one driver
 */
router.get(

    "/:driverId",

    auth,

    authorize("ADMIN"),

    controller.getDriverDocuments

);


/*
 * Approve document
 */
router.put(

    "/:driverId/:documentType/approve",

    auth,

    authorize("ADMIN"),

    controller.approveDocument

);


/*
 * Reject document
 */
router.put(

    "/:driverId/:documentType/reject",

    auth,

    authorize("ADMIN"),

    controller.rejectDocument

);

export default router;