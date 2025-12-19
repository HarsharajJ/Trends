import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (_req, res) => {
  res.status(200).json({ message: "Server is healthy 🚀" });
});

// API routes
app.use("/api", routes);

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
