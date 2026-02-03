import * as SQLite from "expo-sqlite";
import { Expense, ExpenseInput } from "../types";

let db: SQLite.SQLiteDatabase | null = null;

export async function initializeDatabase(): Promise<void> {
	try {
		db = await SQLite.openDatabaseAsync("expenses.db");

		await db.execAsync(`
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        currency TEXT DEFAULT 'INR',
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        merchant TEXT,
        original_input TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

		console.log("✅ Database initialized");
	} catch (error) {
		console.error("❌ Database initialization error:", error);
		throw error;
	}
}

export async function createExpense(expense: ExpenseInput): Promise<Expense> {
	if (!db) throw new Error("Database not initialized");

	try {
		const result = await db.runAsync(
			`INSERT INTO expenses (amount, currency, category, description, merchant, original_input)
       VALUES (?, ?, ?, ?, ?, ?)`,
			[
				expense.amount,
				expense.currency,
				expense.category,
				expense.description,
				expense.merchant || null,
				expense.original_input,
			],
		);

		const newExpense = await db.getFirstAsync<Expense>(
			"SELECT * FROM expenses WHERE id = ?",
			[result.lastInsertRowId],
		);

		if (!newExpense) throw new Error("Failed to retrieve created expense");

		return newExpense;
	} catch (error) {
		console.error("❌ Create expense error:", error);
		throw error;
	}
}

export async function getAllExpenses(): Promise<Expense[]> {
	if (!db) throw new Error("Database not initialized");

	try {
		const expenses = await db.getAllAsync<Expense>(
			"SELECT * FROM expenses ORDER BY created_at DESC",
		);
		return expenses;
	} catch (error) {
		console.error("❌ Get expenses error:", error);
		throw error;
	}
}

export async function deleteExpense(id: number): Promise<boolean> {
	if (!db) throw new Error("Database not initialized");

	try {
		const result = await db.runAsync("DELETE FROM expenses WHERE id = ?", [id]);
		return result.changes > 0;
	} catch (error) {
		console.error("❌ Delete expense error:", error);
		throw error;
	}
}
