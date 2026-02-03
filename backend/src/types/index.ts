export interface Expense {
	id: number;
	amount: number;
	currency: string;
	category: string;
	description: string;
	merchant: string | null;
	original_input: string;
	created_at: string;
}

export interface ExpenseInput {
	amount: number;
	currency: string;
	category: string;
	description: string;
	merchant: string | null;
	original_input: string;
}

export interface ParsedExpense {
	amount: number | null;
	currency: string;
	category: string;
	description: string;
	merchant: string | null;
	error?: string;
}
