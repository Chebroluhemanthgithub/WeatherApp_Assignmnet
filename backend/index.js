import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import weatherRoutes from "./routes/weatherRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Use routes
app.use("/api", weatherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
