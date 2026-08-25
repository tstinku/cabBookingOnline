import { body } from "express-validator";

export const uploadDrivingLicenseValidation = [

    body("number")
        .trim()
        .notEmpty()
        .withMessage("Driving license number is required"),

    body("expiryDate")
        .notEmpty()
        .withMessage("Expiry date is required")
        .isISO8601()
        .withMessage("Invalid expiry date format")

];

export const uploadInsuranceValidation = [

    body("number")
        .trim()
        .notEmpty()
        .withMessage("Insurance number is required"),

    body("expiryDate")
        .notEmpty()
        .withMessage("Expiry date is required")
        .isISO8601()
        .withMessage("Invalid expiry date")

];

export const uploadRegistrationCertificateValidation = [

    body("number")
        .trim()
        .notEmpty()
        .withMessage("RC number is required"),

    body("expiryDate")
        .optional()
        .isISO8601()
        .withMessage("Invalid expiry date")

];

export const uploadPollutionCertificateValidation = [

    body("number")
        .trim()
        .notEmpty()
        .withMessage("Pollution certificate number is required"),

    body("expiryDate")
        .notEmpty()
        .withMessage("Expiry date is required")
        .isISO8601()
        .withMessage("Invalid expiry date")

];

export const uploadIdentityProofValidation = [

    body("type")
        .notEmpty()
        .withMessage("Identity proof type is required")
        .isIn([
            "AADHAAR",
            "PAN",
            "PASSPORT"
        ])
        .withMessage("Invalid identity proof type"),

    body("number")
        .trim()
        .notEmpty()
        .withMessage("Identity proof number is required")

];