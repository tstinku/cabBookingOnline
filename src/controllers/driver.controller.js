import driverService from "../services/driver.service.js";
import ApiResponse from "../common/responses/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const goOnline=asyncHandler(async(req,res,next)=>{

    const driver = await driverService.setOnline(
        req.auth.id
    );

    res.json(ApiResponse.success("Driver set online", driver));

});

const goOffline=asyncHandler(async(req,res,next)=>{

    const driver=await driverService.setOffline(
        req.auth.id
    );

    res.json(ApiResponse.success("Driver set offline", driver));

});

const updateLocation=asyncHandler(async(req,res,next)=>{

    const {latitude,longitude}=req.body;

    const driver = await driverService.updateLocation(
        req.auth.id,
        latitude,
        longitude
    );

    res.json(ApiResponse.success("Location updated", driver));

});


export default {
    goOnline,
    goOffline,
    updateLocation
};