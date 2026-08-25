import express from "express";
import auth from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import {
    uploadProfilePhoto,
    uploadDrivingLicense,
    uploadRegistrationCertificate,
    uploadInsurance,
    uploadPollutionCertificate,
    uploadIdentityProof
} from "../middleware/upload.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
    uploadDrivingLicenseValidation,
    uploadInsuranceValidation,
    uploadRegistrationCertificateValidation,
    uploadPollutionCertificateValidation,
    uploadIdentityProofValidation
} from "../validators/driverDocument.validator.js";

import ROLES from "../common/constants/roles.js";

import driverDocumentController from "../controllers/driverDocument.controller.js";

const router = express.Router();

router.post(

    "/profile-photo",
    auth,
    authorize(ROLES.DRIVER),
    uploadProfilePhoto.single("profilePhoto"),
    validate,
    driverDocumentController.uploadProfilePhoto

);

router.post(

    "/driving-license",
    auth,
    authorize(ROLES.DRIVER ),
    uploadDrivingLicense.single("drivingLicense"),
    uploadDrivingLicenseValidation,
    validate,
    driverDocumentController.uploadDrivingLicense

);

router.post(

    "/insurance",
    auth,
    authorize(ROLES.DRIVER),
    uploadInsurance.single("insurance"),
    uploadInsuranceValidation,
    validate,
    driverDocumentController.uploadInsurance

);

router.post(

    "/registration-certificate",
    auth,
    authorize(ROLES.DRIVER),
    uploadRegistrationCertificate.single("registrationCertificate"),
    uploadRegistrationCertificateValidation,
    validate,
    driverDocumentController.uploadRegistrationCertificate

);

router.post(

    "/pollution-certificate",
    auth,
    authorize(ROLES.DRIVER),
    uploadPollutionCertificate.single("pollutionCertificate"),
    uploadPollutionCertificateValidation,
    validate,
    driverDocumentController.uploadPollutionCertificate

);

router.post(

    "/identity-proof",
    auth,
    authorize(ROLES.DRIVER),
    uploadIdentityProof.single("identityProof"),
    uploadIdentityProofValidation,
    validate,
    driverDocumentController.uploadIdentityProof

);

router.get(

    "/",
    auth,
    authorize(ROLES.DRIVER),
    driverDocumentController.getDocuments

);

export default router;