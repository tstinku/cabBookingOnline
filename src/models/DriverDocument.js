import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema(
{
    number: {
        type: String
    },

    imageUrl: {
        type: String
    },

    expiryDate: {
        type: Date
    },

    status: {
        type: String,
        enum: [
            "NOT_UPLOADED",
            "PENDING",
            "UNDER_REVIEW",
            "APPROVED",
            "REJECTED"
        ],
        default: "NOT_UPLOADED"
    },

    rejectionReason: String,

    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAuth"
    },

    verifiedAt: Date

},
{
    _id: false
});

const driverDocumentSchema = new mongoose.Schema({

    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver",
        required: true,
        unique: true
    },

    profilePhoto: {
        imageUrl: String,
        status: {
            type: String,
            enum: [
                "NOT_UPLOADED",
                "PENDING",
                "APPROVED",
                "REJECTED"
            ],
            default: "NOT_UPLOADED"
        },
        rejectionReason: String
    },

    drivingLicense: verificationSchema,

    registrationCertificate: verificationSchema,

    insurance: verificationSchema,

    pollutionCertificate: verificationSchema,

    identityProof: {
        type: {
            type: String,
            enum: [
                "AADHAAR",
                "PAN",
                "PASSPORT"
            ]
        },

        number: String,

        imageUrl: String,

        status: {
            type: String,
            enum: [
                "NOT_UPLOADED",
                "PENDING",
                "APPROVED",
                "REJECTED"
            ],
            default: "NOT_UPLOADED"
        },

        rejectionReason: String,

        verifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserAuth"
        },

        verifiedAt: Date
    }

},
{
    timestamps: true
});

export default mongoose.model(
    "DriverDocument",
    driverDocumentSchema
);