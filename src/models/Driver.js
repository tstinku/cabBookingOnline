import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
{
    authId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAuth",
        required: true,
        unique: true
    },

    vehicle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vehicle"
    },

    name:{
        type:String,
        required:true
    },

    phone:String,

    licenseNumber:{
        type:String,
        required:true
    },

    rating:{
        type:Number,
        default:5
    },

    totalTrips:{
        type:Number,
        default:0
    },

    isOnline:{
        type:Boolean,
        default:false
    },

    isAvailable:{
        type:Boolean,
        default:true
    },

    currentLocation:{
        type:{
            type:String,
            enum:["Point"],
            default:"Point"
        },
        coordinates:{
            type:[Number],
            default:[0,0]
        }
    }

},{timestamps:true});

driverSchema.index({
    currentLocation:"2dsphere"
});

export default mongoose.model("Driver",driverSchema);