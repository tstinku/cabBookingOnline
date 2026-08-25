import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../common/errors/ApiError.js";
import ApiResponse from "../common/responses/ApiResponse.js";
import DriverDocumentService from "../services/driverDocument.service.js";

const getUploadedFilePath = (req) => {
    if (!req.file) {
        throw new ApiError(400, "File upload is required");
    }

    return req.file.path;
};

const uploadProfilePhoto = asyncHandler(async (req, res) => {

    const document =
        await DriverDocumentService.uploadProfilePhoto(
            req.auth.id,
            getUploadedFilePath(req)
        );

    return res.status(201).json(
        ApiResponse.created(
            "Profile photo uploaded successfully",
            document
        )
    );

});

const uploadDrivingLicense = asyncHandler(async (req, res) => {



    const document =
        await DriverDocumentService.uploadDrivingLicense(
            req.auth.id,
            {
                number: req.body.number,
                expiryDate: req.body.expiryDate,
                imageUrl: getUploadedFilePath(req)
            }            
        );

    return res.status(201).json(
        ApiResponse.created(
            "Driving license uploaded successfully",
            document
        )
    );

});

const uploadRegistrationCertificate = asyncHandler(async (req, res) => {

    const document =
        await DriverDocumentService.uploadRegistrationCertificate(
            req.auth.id,
            {
                number: req.body.number,
                expiryDate: req.body.expiryDate,
                imageUrl: getUploadedFilePath(req)
            }
        );

    return res.status(201).json(
        ApiResponse.created(
            "Registration certificate uploaded successfully",
            document
        )
    );

});

const uploadInsurance = asyncHandler(async (req, res) => {

    const document =
        await DriverDocumentService.uploadInsurance(
            req.auth.id,
            {
                number: req.body.number,
                expiryDate: req.body.expiryDate,
                imageUrl: getUploadedFilePath(req)
            }
        );

    return res.status(201).json(
        ApiResponse.created(
            "Insurance uploaded successfully",
            document
        )
    );

});

const uploadPollutionCertificate = asyncHandler(async (req, res) => {

    const document =
        await DriverDocumentService.uploadPollutionCertificate(
            req.auth.id,
            {
                number: req.body.number,
                expiryDate: req.body.expiryDate,
                imageUrl: getUploadedFilePath(req)
            }
        );

    return res.status(201).json(
        ApiResponse.created(
            "Pollution certificate uploaded successfully",
            document
        )
    );

});

const uploadIdentityProof = asyncHandler(async (req, res) => {

    const document =
        await DriverDocumentService.uploadIdentityProof(
            req.auth.id,
            {
                type: req.body.type,
                number: req.body.number,
                imageUrl: getUploadedFilePath(req)
            }
        );

    return res.status(201).json(
        ApiResponse.created(
            "Identity proof uploaded successfully",
            document
        )
    );

});

const getDocuments = asyncHandler(async (req, res) => {

    const documents =
        await DriverDocumentService.getDocuments(
            req.auth.id
        );

    return res.json(
        ApiResponse.success(
            "Driver documents fetched successfully",
            documents
        )
    );

});

export default {
    uploadProfilePhoto,
    uploadDrivingLicense,
    uploadRegistrationCertificate,
    uploadInsurance,
    uploadPollutionCertificate,
    uploadIdentityProof,
    getDocuments
};