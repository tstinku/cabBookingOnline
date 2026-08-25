import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import auth from "./routes/auth.routes.js";
import { error as errorHandler } from "./middleware/error.middleware.js";
import driverRoutes from "./routes/driver.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";
import driverDocumentRoutes from "./routes/driverDocument.routes.js";
import adminDriverDocumentRoutes from "./routes/adminDriverDocument.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Uber Clone API"
    });
});

app.use("/api/auth", auth);
app.use("/api/drivers", driverRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/driver-documents", driverDocumentRoutes);
app.use(
    "/api/admin/driver-documents",
    adminDriverDocumentRoutes
);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handler should be the last middleware
app.use(errorHandler);

export default app;