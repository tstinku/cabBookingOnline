import Vehicle from "../models/Vehicle.js";

class VehicleRepository{

    create(data){
        return Vehicle.create(data);
    }

    findByDriver(driverId){
        return Vehicle.findOne({driverId});
    }

    update(vehicleId,data){
        return Vehicle.findByIdAndUpdate(
            vehicleId,
            data,
            {new:true}
        );
    }

    delete(vehicleId){
        return Vehicle.findByIdAndDelete(vehicleId);
    }

}

export default new VehicleRepository();