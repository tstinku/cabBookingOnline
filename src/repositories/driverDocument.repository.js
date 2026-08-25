import DriverDocument from "../models/DriverDocument.js";

class DriverDocumentRepository {

    create(data) {
        return DriverDocument.create(data);
    }

    findByDriver(driverId) {
        return DriverDocument.findOne({ driverId });
    }

    async findPendingDocuments() {

        return DriverDocument.find({

            $or: [

                {
                    "drivingLicense.status":
                        "PENDING"
                },

                {
                    "registrationCertificate.status":
                        "PENDING"
                },

                {
                    "insurance.status":
                        "PENDING"
                },

                {
                    "pollutionCertificate.status":
                        "PENDING"
                },

                {
                    "identityProof.status":
                        "PENDING"
                }

            ]

        }).populate(
            "driverId"
        );

    }



}

export default new DriverDocumentRepository();