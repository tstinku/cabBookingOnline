const authorize = (...roles) => {

    return (req, res, next) => {

        if (
            !roles.includes(
                req.auth.role
            )
        ) {

            return res.status(403).json({

                message:
                    "Access denied"

            });

        }

        next();

    };

};

export default authorize;