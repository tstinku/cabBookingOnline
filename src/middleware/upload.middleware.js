import multer from "multer";
import path from "path";
import fs from "fs";
import UPLOAD_FOLDERS from "../common/constants/upload-folders.js";


const uploadRoot = path.join(
    process.cwd(),
    "uploads",
    "driver-documents"
);

/**
 * Create directory if it does not exist
 */
function createDirectory(directory) {

    if (!fs.existsSync(directory)) {

        fs.mkdirSync(directory, {
            recursive: true
        });

    }

}

/**
 * Create multer storage for a specific document type
 */
function createStorage(folderName) {

    return multer.diskStorage({

        destination(req, file, cb) {
            console.log(req.file);

            const uploadPath = path.join(
                uploadRoot,
                folderName
            );

            createDirectory(uploadPath);

            cb(null, uploadPath);

        },

        filename(req, file, cb) {

            const extension = path.extname(
                file.originalname
            );

            const uniqueName =
                Date.now() +
                "-" +
                Math.round(Math.random() * 1000000) +
                extension;

            cb(null, uniqueName);

        }

    });

}

/**
 * Allowed file types
 */
const allowedMimeTypes = [

    "image/jpeg",

    "image/png",

    "image/jpg",

    "application/pdf"

];

const allowedExtensions = [

    ".jpg",

    ".jpeg",

    ".png",

    ".pdf"

];

/**
 * Validate uploaded file
 */
function fileFilter(req, file, cb) {

    const extension = path.extname(
        file.originalname
    ).toLowerCase();

    const hasAllowedMimeType =
        allowedMimeTypes.includes(
            file.mimetype
        );

    const hasGenericMimeType =
        !file.mimetype ||
        file.mimetype === "application/octet-stream";

    if (
        !hasAllowedMimeType &&
        !(hasGenericMimeType &&
            allowedExtensions.includes(extension))
    ) {

        return cb(
            new Error(
                "Only JPG, PNG and PDF files are allowed."
            )
        );

    }

    cb(null, true);

}

/**
 * Create uploader
 */
function createUploader(folderName) {

    return multer({

        storage: createStorage(
            folderName
        ),

        fileFilter,

        limits: {

            fileSize:
                5 * 1024 * 1024

        }

    });

}

/**
 * Document-specific uploaders
 */
const uploadProfilePhoto =
    createUploader(
        UPLOAD_FOLDERS.PROFILE_PHOTO
    );

const uploadDrivingLicense =
    createUploader(
        UPLOAD_FOLDERS.DRIVING_LICENSE
    );

const uploadRegistrationCertificate =
    createUploader(
        UPLOAD_FOLDERS.REGISTRATION_CERTIFICATE
    );

const uploadInsurance =
    createUploader(
        UPLOAD_FOLDERS.INSURANCE
    );

const uploadPollutionCertificate =
    createUploader(
        UPLOAD_FOLDERS.POLLUTION_CERTIFICATE
    );

const uploadIdentityProof =
    createUploader(
        UPLOAD_FOLDERS.IDENTITY_PROOF
    );


export {

    uploadProfilePhoto,
    uploadDrivingLicense,
    uploadRegistrationCertificate,
    uploadInsurance,
    uploadPollutionCertificate,
    uploadIdentityProof
};