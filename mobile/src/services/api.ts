import { ExpenseInput } from "../types";

// Change this to your computer's IP address when testing on a physical device
// For iOS simulator: localhost works
// For Android emulator: use 10.0.2.2
// For physical device: use your computer's local IP (e.g., 192.168.1.x)
const API_BASE_URL = "http://192.168.29.138:3000";

export async function parseExpenseWithAI(input: string): Promise<ExpenseInput> {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 15000);

	try {
		const response = await fetch(`${API_BASE_URL}/api/parse`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ input }),
			signal: controller.signal,
		});

		clearTimeout(timeoutId);

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error || "Failed to parse expense");
		}

		return data.parsed;
	} catch (error: any) {
		if (error.name === "AbortError") {
			throw new Error("Request timeout. Please try again.");
		}
		throw new Error(error.message || "Failed to parse expense");
	}
}
