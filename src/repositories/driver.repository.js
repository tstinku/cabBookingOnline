import Driver from "../models/Driver.js";

class DriverRepository{

    create(data){
        return Driver.create(data);
    }

    findByAuthId(authId){
        return Driver.findOne({authId});
    }

    update(driverId,data){
        return Driver.findByIdAndUpdate(
            driverId,
            data,
            {new:true}
        );
    }

    updateLocation(driverId,coordinates){

        return Driver.findByIdAndUpdate(
            driverId,
            {
                currentLocation:{
                    type:"Point",
                    coordinates
                }
            },
            {new:true}
        );
    }

    findNearby(coordinates,maxDistance){

        return Driver.find({

            isOnline:true,

            isAvailable:true,

            currentLocation:{
                $near:{
                    $geometry:{
                        type:"Point",
                        coordinates
                    },
                    $maxDistance:maxDistance
                }
            }

        });

    }

}

export default new DriverRepository();