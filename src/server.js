import dotenv from "dotenv";
import http from "http";
import app from "./app.js";
import connectDB from "./config/database.js";

dotenv.config();

const server = http.createServer(app);

connectDB();

const PORT = process.env.PORT || 3000;

server.listen(PORT,() => {
    console.log(`Server running on ${PORT}`);
});