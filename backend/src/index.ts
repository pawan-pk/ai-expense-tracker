import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initializeDatabase } from "./database/db";
import expenseRoutes from "./routes/expenses";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
initializeDatabase();

// Health check
app.get("/health", (req, res) => {
	res.json({ status: "ok", message: "AI Expense Tracker API is running" });
});

// Routes
app.use("/api/expenses", expenseRoutes);

// Start server
app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
	console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
