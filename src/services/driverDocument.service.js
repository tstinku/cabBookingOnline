import ApiError from "../common/errors/ApiError.js";
import DriverRepository from "../repositories/driver.repository.js";
import DocumentRepository from "../repositories/driverDocument.repository.js";  

class DriverDocumentService {

    async getDriver(authId) {

        const driver = await DriverRepository.findByAuthId(authId);

        if (!driver)
            throw new ApiError(404, "Driver not found");

        return driver;
    }

    async getOrCreateDocument(driverId) {

        let document = await DocumentRepository.findByDriver(driverId);

        if (!document) {

            document = await DocumentRepository.create({
                driverId
            });

        }

        return document;

    }


    async uploadProfilePhoto(authId, imageUrl) {

        const driver = await this.getDriver(authId);

        const document =
            await this.getOrCreateDocument(driver._id);

        document.profilePhoto = {

            imageUrl,

            status: "PENDING",

            rejectionReason: null

        };

        await document.save();

        return document;

    }

    async uploadDrivingLicense(authId, payload) {

        const driver = await this.getDriver(authId);

        const document =
            await this.getOrCreateDocument(driver._id);

        document.drivingLicense = {

            number: payload.number,

            imageUrl: payload.imageUrl,

            expiryDate: payload.expiryDate,

            status: "PENDING",

            rejectionReason: null,

            verifiedBy: null,

            verifiedAt: null

        };

        await document.save();

        return document;

    }

    async uploadRegistrationCertificate(authId, payload) {

        const driver = await this.getDriver(authId);

        const document =
            await this.getOrCreateDocument(driver._id);

        document.registrationCertificate = {

            number: payload.number,

            imageUrl: payload.imageUrl,

            expiryDate: payload.expiryDate,

            status: "PENDING",

            rejectionReason: null,

            verifiedBy: null,

            verifiedAt: null

        };

        await document.save();

        return document;

    }

    async uploadInsurance(authId, payload) {

        const driver = await this.getDriver(authId);

        const document =
            await this.getOrCreateDocument(driver._id);


        document.insurance = {

            number: payload.number,

            imageUrl: payload.imageUrl,

            expiryDate: payload.expiryDate,

            status: "PENDING",

            rejectionReason: null,

            verifiedBy: null,

            verifiedAt: null

        };

        await document.save();

        return document;

    }

    async uploadPollutionCertificate(authId, payload) {

        const driver = await this.getDriver(authId);

        const document =
            await this.getOrCreateDocument(driver._id);

        document.pollutionCertificate = {

            number: payload.number,

            imageUrl: payload.imageUrl,

            expiryDate: payload.expiryDate,

            status: "PENDING",

            rejectionReason: null,

            verifiedBy: null,

            verifiedAt: null

        };

        await document.save();

        return document;

    }

    async uploadIdentityProof(authId, payload) {

        const driver = await this.getDriver(authId);

        const document =
            await this.getOrCreateDocument(driver._id);

        document.identityProof = {

            type: payload.type,

            number: payload.number,

            imageUrl: payload.imageUrl,

            status: "PENDING",

            rejectionReason: null,

            verifiedBy: null,

            verifiedAt: null

        };

        await document.save();

        return document;

    }

    async getDocuments(authId) {

        const driver = await this.getDriver(authId);

        return DocumentRepository.findByDriver(driver._id);

    }

    async getDriverDocumentFolder(
    driverId,
    documentType
    ) {

        // Root folder
        const rootFolder =
            await this.createFolder(
                "Cab Booking Documents"
            );

        // Driver folder
        const driverFolder =
            await this.createFolder(
                `Driver_${driverId}`,
                rootFolder.id
            );

        // Document folder
        const documentFolder =
            await this.createFolder(
                documentType,
                driverFolder.id
            );

        return {
            rootFolder,
            driverFolder,
            documentFolder
        };
    }

}


export default new DriverDocumentService();