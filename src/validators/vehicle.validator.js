import { body } from "express-validator";

export const registerVehicleValidation = [

    body("registrationNumber")
        .notEmpty(),

    body("vehicleType")
        .isIn([
            "BIKE",
            "AUTO",
            "SEDAN",
            "SUV",
            "PREMIUM"
        ]),

    body("company")
        .notEmpty(),

    body("model")
        .notEmpty(),

    body("color")
        .notEmpty(),

    body("manufactureYear")
        .isInt({min:1990}),

    body("seatingCapacity")
        .isInt({min:1})
];