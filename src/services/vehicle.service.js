import VehicleRepository from "../repositories/vehicle.repository.js";
import driverRepository from "../repositories/driver.repository.js";
import ApiError from "../common/errors/ApiError.js";

class VehicleService{

    async registerVehicle(authId,data){

        console.log("authId",authId);
        const driver=await driverRepository.findByAuthId(authId);
        console.log("driver",driver);

        if(!driver)
            throw new ApiError(404,"Driver not found");

        const vehicleExists=
            await VehicleRepository.findByDriver(driver._id);

        if(vehicleExists)
            throw new ApiError(
                409,
                "Vehicle already registered"
            );

        return VehicleRepository.create({

            driverId:driver._id,

            ...data

        });

    }

    async getVehicle(authId){

        const driver=
            await DriverRepository.findByAuthId(authId);

        return VehicleRepository.findByDriver(driver._id);

    }

    async updateVehicle(authId,data){

        const driver=
            await DriverRepository.findByAuthId(authId);

        const vehicle=
            await VehicleRepository.findByDriver(driver._id);

        if(!vehicle)
            throw new ApiError(
                404,
                "Vehicle not found"
            );

        return VehicleRepository.update(
            vehicle._id,
            data
        );

    }

}

export default new VehicleService();
