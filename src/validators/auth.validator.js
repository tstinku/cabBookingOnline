import { body } from "express-validator";

export const registerValidation = [

    body("email")
        .isEmail()
        .withMessage("Invalid email"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password should contain minimum 6 characters"),

    body("role")
        .optional()
        .isIn(["RIDER", "DRIVER", "ADMIN"])
        .withMessage("Role must be RIDER, DRIVER, or ADMIN"),

    body("name")
        .optional()
        .isString()
        .withMessage("Name must be a string"),

    body("phone")
        .optional()
        .isString()
        .withMessage("Phone must be a string"),

    body("licenseNumber")
        .optional()
        .isString()
        .withMessage("License number must be a string")
];

export const loginValidation = [

    body("email")
        .isEmail()
        .withMessage("Invalid email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
];