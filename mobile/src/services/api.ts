import { Expense } from "../types";

// Change this to your computer's IP address when testing on a physical device
// For iOS simulator: localhost works
// For Android emulator: use 10.0.2.2
// For physical device: use your computer's local IP (e.g., 192.168.1.x)
const API_BASE_URL = "http://192.168.29.150:3000";

export async function addExpense(input: string): Promise<Expense> {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 10000);

	try {
		const response = await fetch(`${API_BASE_URL}/api/expenses`, {
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
			throw new Error(data.error || "Failed to add expense");
		}

		return data.expense;
	} catch (error: any) {
		if (error.name === "AbortError") {
			throw new Error("Request timeout. Please try again.");
		}
		throw new Error(error.message || "Failed to add expense");
	}
}

export async function getExpenses(): Promise<Expense[]> {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 10000);

	try {
		const response = await fetch(`${API_BASE_URL}/api/expenses`, {
			signal: controller.signal,
		});

		clearTimeout(timeoutId);

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error || "Failed to fetch expenses");
		}

		return data.expenses;
	} catch (error: any) {
		if (error.name === "AbortError") {
			throw new Error("Request timeout. Please try again.");
		}
		throw new Error(error.message || "Failed to fetch expenses");
	}
}

export async function deleteExpense(id: number): Promise<void> {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 10000);

	try {
		const response = await fetch(`${API_BASE_URL}/api/expenses/${id}`, {
			method: "DELETE",
			signal: controller.signal,
		});

		clearTimeout(timeoutId);

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error || "Failed to delete expense");
		}
	} catch (error: any) {
		if (error.name === "AbortError") {
			throw new Error("Request timeout. Please try again.");
		}
		throw new Error(error.message || "Failed to delete expense");
	}
}
