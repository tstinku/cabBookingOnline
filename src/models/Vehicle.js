import mongoose from "mongoose";

const vehicleSchema=new mongoose.Schema({

    driverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Driver",
        required:true,
        unique:true
    },

    registrationNumber:{
        type:String,
        required:true,
        unique:true,
        uppercase:true,
        trim:true
    },

    vehicleType:{
        type:String,
        enum:[
            "BIKE",
            "AUTO",
            "SEDAN",
            "SUV",
            "PREMIUM"
        ],
        required:true
    },

    company:{
        type:String,
        required:true
    },

    model:{
        type:String,
        required:true
    },

    color:{
        type:String,
        required:true
    },

    manufactureYear:{
        type:Number,
        required:true
    },

    seatingCapacity:{
        type:Number,
        required:true
    },

    insuranceNumber:String,

    insuranceExpiry:Date,

    rcNumber:String,

    rcExpiry:Date,

    fitnessExpiry:Date,

    pollutionExpiry:Date,

    isVerified:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
});

export default mongoose.model("Vehicle",vehicleSchema);