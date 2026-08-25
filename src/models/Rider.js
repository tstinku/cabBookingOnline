import mongoose from "mongoose";
const riderSchema = new mongoose.Schema({
    authId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAuth",
        required: true,
        unique: true
    },
    name: String,
    phone: String,
    profileImage: String
}, {
    timestamps: true
});

export default mongoose.model("Rider", riderSchema);