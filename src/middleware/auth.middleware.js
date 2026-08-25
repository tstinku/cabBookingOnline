import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader)
        return res.status(401).json({
            message: "Unauthorized"
        });

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7).trim()
        : authHeader.trim();

    if (!token)
        return res.status(401).json({
            message: "Unauthorized"
        });

    try {
        req.auth = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        next();
    } catch {
        return res.status(401).json({
            message: "Invalid Token"
        });
    }
};

export default auth;