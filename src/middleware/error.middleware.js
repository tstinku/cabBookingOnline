import multer from "multer";

export const error = (err, req, res, next) => {

    if (err instanceof multer.MulterError) {
    
        switch (err.code) {

            case "LIMIT_FILE_SIZE":

                return res.status(400).json({
                    success: false,
                    message: "File size must not exceed 5 MB."
                });

            case "LIMIT_UNEXPECTED_FILE":

                return res.status(400).json({
                    success: false,
                    message: "Unexpected file uploaded."
                });

            case "LIMIT_FILE_COUNT":

                return res.status(400).json({
                    success: false,
                    message: "Too many files uploaded."
                });

            case "LIMIT_FIELD_KEY":

                return res.status(400).json({
                    success: false,
                    message: "Field name is too long."
                });

            case "LIMIT_FIELD_VALUE":

                return res.status(400).json({
                    success: false,
                    message: "Field value is too large."
                });

            default:

                return res.status(400).json({
                    success: false,
                    message: "File upload failed."
                });
        }
    }

    // Our custom fileFilter error
    if (
        err.message ===
        "Only JPG, PNG and PDF files are allowed."
    ) {

        return res.status(400).json({
            success: false,
            message: err.message,
            ...(err.data && {
            data: err.data
            })
        });
    }
    

    const status =
        err.statusCode || 500;

    return res.status(status).json({

        success: false,

        message: err.message,

        ...(err.data && {
        data: err.data
        })
    });

};