import driverRepository from "../repositories/driver.repository.js";
import ApiError from "../common/errors/ApiError.js";
import DriverDocumentRepository from "../repositories/driverDocument.repository.js";
import AdminDriverDocumentService from "./adminDriverDocument.service.js";
class DriverService{

    async updateLocation(authId,latitude,longitude){

        const driver=await driverRepository.findByAuthId(authId);

        if(!driver)
            throw new ApiError(404, "Driver not found");

        return driverRepository.updateLocation(
            driver._id,
            [longitude,latitude]
        );

    }

    async setOnline(authId){    

        const driver=await driverRepository.findByAuthId(authId);

        if(!driver)
            throw new ApiError(404, "Driver not found");

        const documents =
            await DriverDocumentRepository
                .findByDriver(driver._id);

        if (!documents) {

            throw new ApiError(
                403,
                "Driver documents are not available.",
                {
                    pendingDocuments: [],
                    rejectedDocuments: [],
                    missingDocuments: [
                        "drivingLicense",
                        "registrationCertificate",
                        "insurance",
                        "pollutionCertificate",
                        "identityProof"
                    ]
                }
            );

            // throw new ApiError(
            //     403,
            //     "Driver documents are not available. Please upload all mandatory documents."
            // );

        }

        const approvalStatus  =
            AdminDriverDocumentService.getDocumentApprovalStatus(
                documents
            );

        if (!approvalStatus.approved) {

            throw new ApiError(
                403,
                "Driver cannot go online until all mandatory documents are approved.",
                approvalStatus
            );

        }

        return driverRepository.update(driver._id,{
            isOnline:true
        });

    }

    async setOffline(authId){

        const driver=await driverRepository.findByAuthId(authId);

        if(!driver)
            throw new ApiError(404, "Driver not found");

        return driverRepository.update(driver._id,{
            isOnline:false,
            isAvailable:false
        });

    }

    async getNearbyDrivers(latitude,longitude){

        return driverRepository.findNearby(
            [longitude,latitude],
            5000
        );

    }


}

export default new DriverService();