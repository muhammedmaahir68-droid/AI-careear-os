import "dotenv/config";
import express from "express";
import cors from "cors";
import syllabusRoutes from "./routes/syllabus.js";
import companiesRoutes from "./routes/companies.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/syllabus", syllabusRoutes);
app.use("/api/companies", companiesRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
