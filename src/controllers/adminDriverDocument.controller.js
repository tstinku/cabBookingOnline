import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../common/responses/ApiResponse.js";
import adminDriverDocumentService from "../services/adminDriverDocument.service.js";    


const getPendingDocuments =
    asyncHandler(async (req, res) => {

        const documents =
            await adminDriverDocumentService
                .getPendingDocuments();

        return res.status(200).json({

            success: true,

            message:
                "Pending documents fetched successfully",

            data: documents

        });

    });


const getDriverDocuments =
    asyncHandler(async (req, res) => {

        const documents =
            await adminDriverDocumentService
                .getDriverDocuments(
                    req.params.driverId
                );

        return res.status(200).json({

            success: true,

            data: documents

        });

    });


const approveDocument = asyncHandler(async (req, res) => {

        const documents =
            await adminDriverDocumentService
                .approveDocument(

                    req.params.driverId,

                    req.params.documentType,

                    req.auth._id

                );

        return res.status(200).json({

            success: true,

            message:
                "Document approved successfully",

            data: documents

        });

    });


const rejectDocument =
    asyncHandler(async (req, res) => {

        const documents =
            await adminDriverDocumentService
                .rejectDocument(

                    req.params.driverId,

                    req.params.documentType,

                    req.auth._id,

                    req.body.reason

                );

        return res.status(200).json({

            success: true,

            message:
                "Document rejected successfully",

            data: documents

        });

    });

export default {

    getPendingDocuments,
    getDriverDocuments,
    approveDocument,
    rejectDocument
};