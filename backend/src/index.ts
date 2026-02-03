import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { parseExpense } from "./services/aiService";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
	res.json({ status: "ok", message: "AI Expense Parser API is running" });
});

// Parse expense with AI
app.post("/api/parse", async (req, res) => {
	try {
		const { input } = req.body;

		if (!input || typeof input !== "string") {
			return res.status(400).json({ error: "Input text is required" });
		}

		const parsed = await parseExpense(input);

		if (parsed.error || parsed.amount === null) {
			return res
				.status(400)
				.json({ error: parsed.error || "Could not parse expense" });
		}

		res.json({ parsed });
	} catch (error: any) {
		console.error("Parse error:", error);
		res.status(500).json({ error: error.message || "Failed to parse expense" });
	}
});

// Start server
app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
	console.log(`📊 Health check: http://localhost:${PORT}/health`);
	console.log(`🤖 AI Parser: POST http://localhost:${PORT}/api/parse`);
});
