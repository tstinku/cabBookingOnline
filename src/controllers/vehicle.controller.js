import vehicleService from "../services/vehicle.service.js";
import ApiResponse from "../common/responses/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const register=asyncHandler(async(req,res)=>{

    const vehicle=
        await vehicleService.registerVehicle(
            req.auth.id,
            req.body
        );

    res.status(201).json(
        ApiResponse.created(
            "Vehicle registered successfully",
            vehicle
        )
    );

});

const getVehicle=asyncHandler(async(req,res)=>{

    const vehicle=
        await vehicleService.getVehicle(
            req.auth.id
        );

    res.json(
        ApiResponse.success(
            "Vehicle fetched successfully",
            vehicle
        )
    );

});

const updateVehicle=asyncHandler(async(req,res)=>{

    const vehicle=
        await vehicleService.updateVehicle(
            req.auth.id,
            req.body
        );

    res.json(
        ApiResponse.success(
            "Vehicle updated successfully",
            vehicle
        )
    );

});


export default {
    register,
    getVehicle,
    updateVehicle
};