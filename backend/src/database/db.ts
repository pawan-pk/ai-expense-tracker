import Database from "better-sqlite3";
import path from "path";
import { Expense, ExpenseInput } from "../types";

const db = new Database(path.join(__dirname, "../../expenses.db"));

export function initializeDatabase() {
	const createTableQuery = `
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      currency TEXT DEFAULT 'INR',
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      merchant TEXT,
      original_input TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

	db.exec(createTableQuery);
	console.log("✅ Database initialized");
}

export function createExpense(expense: ExpenseInput): Expense {
	const stmt = db.prepare(`
    INSERT INTO expenses (amount, currency, category, description, merchant, original_input)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

	const result = stmt.run(
		expense.amount,
		expense.currency,
		expense.category,
		expense.description,
		expense.merchant,
		expense.original_input,
	);

	const getStmt = db.prepare("SELECT * FROM expenses WHERE id = ?");
	return getStmt.get(result.lastInsertRowid) as Expense;
}

export function getAllExpenses(): Expense[] {
	const stmt = db.prepare("SELECT * FROM expenses ORDER BY created_at DESC");
	return stmt.all() as Expense[];
}

export function deleteExpense(id: number): boolean {
	const stmt = db.prepare("DELETE FROM expenses WHERE id = ?");
	const result = stmt.run(id);
	return result.changes > 0;
}

export default db;
