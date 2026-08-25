import mongoose from "mongoose";
import bcrypt from "bcrypt";
import UserAuth from "../models/UserAuth.js";
import dotenv from "dotenv";

dotenv.config();

// run below command to register admin: node src/scripts/createAdmin.js
const MONGO_URI =
    process.env.MONGO_URI;

async function createAdmin() {

    try {

        await mongoose.connect(MONGO_URI);

        console.log(
            "MongoDB connected"
        );

        const email =
            "admin@cabbooking.com";

        const password =
            "Admin@123";

        const existingAdmin =
            await UserAuth.findOne({
                email
            });

        if (existingAdmin) {

            console.log(
                "Admin already exists"
            );

            return;

        }

        // const hashedPassword =
        //     await bcrypt.hash(
        //         password,
        //         12
        //     );

        const admin =
            await UserAuth.create({

                email,

                password,

                role: "ADMIN"

            });

        console.log(
            "Admin created successfully"
        );

        console.log(
            "Admin ID:",
            admin._id.toString()
        );

    }
    catch (error) {

        console.error(
            "Failed to create admin:",
            error
        );

    }
    finally {

        await mongoose.disconnect();

    }

}

createAdmin();