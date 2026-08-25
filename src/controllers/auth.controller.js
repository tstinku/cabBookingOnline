import UserAuth from "../models/UserAuth.js";
import Rider from "../models/Rider.js";
import Driver from "../models/Driver.js";
import { validationResult } from "express-validator";
import generateToken from "../utils/jwt.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../common/responses/ApiResponse.js";
import ROLES from "../common/constants/roles.js";
const register = asyncHandler(async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty())
            return res.status(400).json(errors.array());

        const { email, password, role, name, phone, licenseNumber, profileImage } = req.body;

        const exists = await UserAuth.findOne({ email });

        if (exists)
            return res.status(409).json({
                message: "Email already exists"
            });

        const user = await UserAuth.create({
            email,
            password,
            role: role || ROLES.RIDER
        });

        if (user.role === ROLES.RIDER) {
            await Rider.create({
                authId: user._id,
                name: name || "",
                phone: phone || "",
                profileImage: profileImage || ""
            });
        }

        if (user.role === ROLES.DRIVER) {
            await Driver.create({
                authId: user._id,
                name: name || "",
                licenseNumber: licenseNumber || ""
            });
        }

        const token = generateToken(user);

        res.status(201).json(
            ApiResponse.created("User registered", { token, user })
        );

});

// const register = async (req, res, next) => {

//     try {

//         const errors = validationResult(req);

//         if (!errors.isEmpty())
//             return res.status(400).json(errors.array());

//         const { email, password, role, name, phone, licenseNumber, profileImage } = req.body;

//         const exists = await UserAuth.findOne({ email });

//         if (exists)
//             return res.status(409).json({
//                 message: "Email already exists"
//             });

//         const user = await UserAuth.create({
//             email,
//             password,
//             role: role || "RIDER"
//         });

//         if (user.role === "RIDER") {
//             await Rider.create({
//                 authId: user._id,
//                 name: name || "",
//                 phone: phone || "",
//                 profileImage: profileImage || ""
//             });
//         }

//         if (user.role === "DRIVER") {
//             await Driver.create({
//                 authId: user._id,
//                 licenseNumber: licenseNumber || ""
//             });
//         }

//         const token = generateToken(user);

//         res.status(201).json({
//             token,
//             user
//         });

//     } catch (err) {

//         if (typeof next === "function") {
//             return next(err);
//         }

//         return res.status(500).json({
//             success: false,
//             message: err.message || "Internal Server Error"
//         });

//     }

// };

const login = asyncHandler(async (req, res, next) => {

    const errors = validationResult(req);

        if (!errors.isEmpty())
            return res.status(400).json(errors.array());

        const { email, password } = req.body;

        const user = await UserAuth.findOne({ email });

        if (!user)
            return res.status(401).json({
                message: "Invalid Credentials"
            });

        const valid = await user.comparePassword(password);

        if (!valid)
            return res.status(401).json({
                message: "Invalid Credentials"
            });

        const token = generateToken(user);

        return res.json(
            ApiResponse.success("Login successful", { token, user })
        );

});

// const login = async (req, res, next) => {

//     try {

//         const errors = validationResult(req);

//         if (!errors.isEmpty())
//             return res.status(400).json(errors.array());

//         const { email, password } = req.body;

//         const user = await UserAuth.findOne({ email });

//         if (!user)
//             return res.status(401).json({
//                 message: "Invalid Credentials"
//             });

//         const valid = await user.comparePassword(password);

//         if (!valid)
//             return res.status(401).json({
//                 message: "Invalid Credentials"
//             });

//         const token = generateToken(user);

//         res.json({
//             token,
//             user
//         });

//     } catch (err) {

//         if (typeof next === "function") {
//             return next(err);
//         }

//         return res.status(500).json({
//             success: false,
//             message: err.message || "Internal Server Error"
//         });

//     }

// };

export default { register, login };