import ApiError from "../common/errors/ApiError.js";
import DriverDocumentRepository from "../repositories/driverDocument.repository.js";
import DriverRepository from "../repositories/driver.repository.js";

const DOCUMENT_TYPES = [
    "drivingLicense",
    "registrationCertificate",
    "insurance",
    "pollutionCertificate",
    "identityProof"
];

class AdminDriverDocumentService {

    /**
     * Get all drivers having at least
     * one document waiting for verification.
     */
    async getPendingDocuments() {

        return DriverDocumentRepository
            .findPendingDocuments();

    }

    /**
     * Get all documents belonging to
     * one driver.
     */
    async getDriverDocuments(driverId) {

        const documents =
            await DriverDocumentRepository
                .findByDriver(driverId);

        if (!documents) {

            throw new ApiError(
                404,
                "Driver documents not found"
            );

        }

        return documents;
    }

    /**
     * Approve one document.
     */
    async approveDocument(
        driverId,
        documentType,
        adminId
    ) {

        this.validateDocumentType(
            documentType
        );

        const documents =
            await DriverDocumentRepository
                .findByDriver(driverId);

        if (!documents) {

            throw new ApiError(
                404,
                "Driver documents not found"
            );

        }

        const document =
            documents[documentType];

        if (!document) {

            throw new ApiError(
                404,
                `${documentType} not uploaded`
            );

        }

        if (
            document.status ===
            "APPROVED"
        ) {

            throw new ApiError(
                400,
                `${documentType} is already approved`
            );

        }

        document.status = "APPROVED";

        document.rejectionReason = null;

        document.verifiedBy = adminId;

        document.verifiedAt = new Date();

        await documents.save();

        return documents;
    }

    /**
     * Reject one document.
     */
    async rejectDocument(
        driverId,
        documentType,
        adminId,
        reason
    ) {

        this.validateDocumentType(
            documentType
        );

        if (!reason || !reason.trim()) {

            throw new ApiError(
                400,
                "Rejection reason is required"
            );

        }

        const documents =
            await DriverDocumentRepository
                .findByDriver(driverId);

        if (!documents) {

            throw new ApiError(
                404,
                "Driver documents not found"
            );

        }

        const document =
            documents[documentType];

        if (!document) {

            throw new ApiError(
                404,
                `${documentType} not uploaded`
            );

        }

        document.status = "REJECTED";

        document.rejectionReason =
            reason.trim();

        document.verifiedBy = adminId;

        document.verifiedAt = new Date();

        await documents.save();

        return documents;
    }

    /**
     * Validate supported document type.
     */
    validateDocumentType(documentType) {

        if (
            !DOCUMENT_TYPES.includes(
                documentType
            )
        ) {

            throw new ApiError(
                400,
                "Invalid document type"
            );

        }

    }

    /**
     * Check whether all mandatory
     * documents are approved.
     */
    getDocumentApprovalStatus(documents) {

        const mandatoryDocuments = {

            drivingLicense:
                documents.drivingLicense,

            registrationCertificate:
                documents.registrationCertificate,

            insurance:
                documents.insurance,

            pollutionCertificate:
                documents.pollutionCertificate,

            identityProof:
                documents.identityProof

        };

        const pendingDocuments = [];

        const rejectedDocuments = [];

        const missingDocuments = [];

        Object.entries(
            mandatoryDocuments
        ).forEach(([documentType, document]) => {

            // Document has not been uploaded
            if (!document) {

                missingDocuments.push(
                    documentType
                );

                return;
            }

            // Document uploaded but not verified
            if (
                document.status === "PENDING"
            ) {

                pendingDocuments.push(
                    documentType
                );

                return;
            }

            // Document rejected by admin
            if (
                document.status === "REJECTED"
            ) {

                rejectedDocuments.push(
                    documentType
                );

            }

        });

        const approved =
            pendingDocuments.length === 0 &&
            rejectedDocuments.length === 0 &&
            missingDocuments.length === 0;

        return {

            approved,

            pendingDocuments,

            rejectedDocuments,

            missingDocuments

        };

    }

}

export default new AdminDriverDocumentService();
