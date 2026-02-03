import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	FlatList,
	Alert,
	ActivityIndicator,
	RefreshControl,
	SafeAreaView,
	StatusBar,
} from "react-native";
import { Expense, CATEGORY_EMOJIS } from "./src/types";
import { addExpense, getExpenses, deleteExpense } from "./src/services/api";
import { timeAgo } from "./src/utils/timeAgo";

export default function App() {
	const [input, setInput] = useState("");
	const [expenses, setExpenses] = useState<Expense[]>([]);
	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [successExpense, setSuccessExpense] = useState<Expense | null>(null);
	const [deletingId, setDeletingId] = useState<number | null>(null);

	useEffect(() => {
		loadExpenses();
	}, []);

	const loadExpenses = async () => {
		try {
			const data = await getExpenses();
			setExpenses(data);
		} catch (error: any) {
			Alert.alert("Error", error.message);
		}
	};

	const handleAddExpense = async () => {
		if (!input.trim()) return;

		setLoading(true);
		try {
			const expense = await addExpense(input);
			setExpenses([expense, ...expenses]);
			setInput("");
			setSuccessExpense(expense);
			setTimeout(() => setSuccessExpense(null), 3000);
		} catch (error: any) {
			Alert.alert("Error", error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteExpense = (id: number) => {
		Alert.alert(
			"Delete Expense",
			"Are you sure you want to delete this expense?",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: async () => {
						setDeletingId(id);
						try {
							await deleteExpense(id);
							setExpenses(expenses.filter((e) => e.id !== id));
						} catch (error: any) {
							Alert.alert("Error", error.message);
						} finally {
							setDeletingId(null);
						}
					},
				},
			],
		);
	};

	const onRefresh = async () => {
		setRefreshing(true);
		await loadExpenses();
		setRefreshing(false);
	};

	const renderExpenseItem = ({ item }: { item: Expense }) => (
		<View style={styles.expenseItem}>
			<View style={styles.expenseLeft}>
				<Text style={styles.categoryEmoji}>
					{CATEGORY_EMOJIS[item.category] || "📦"}
				</Text>
				<View style={styles.expenseDetails}>
					<Text style={styles.categoryText}>{item.category}</Text>
					<Text style={styles.descriptionText}>{item.description}</Text>
					{item.merchant && (
						<Text style={styles.merchantText}>at {item.merchant}</Text>
					)}
					<Text style={styles.timeText}>{timeAgo(item.created_at)}</Text>
				</View>
			</View>
			<View style={styles.expenseRight}>
				<Text style={styles.amountText}>₹{item.amount.toFixed(2)}</Text>
				{deletingId === item.id ? (
					<ActivityIndicator size="small" color="#ff4444" />
				) : (
					<TouchableOpacity
						onPress={() => handleDeleteExpense(item.id)}
						style={styles.deleteButton}
					>
						<Text style={styles.deleteButtonText}>🗑️</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />

			<View style={styles.header}>
				<Text style={styles.title}>💰 AI Expense Tracker</Text>
				<Text style={styles.subtitle}>Add expenses in plain English</Text>
			</View>

			<View style={styles.inputSection}>
				<TextInput
					style={styles.input}
					placeholder="e.g., Spent 500 on groceries at BigBazaar"
					value={input}
					onChangeText={setInput}
					editable={!loading}
					multiline
				/>
				<TouchableOpacity
					style={[
						styles.addButton,
						(!input.trim() || loading) && styles.addButtonDisabled,
					]}
					onPress={handleAddExpense}
					disabled={!input.trim() || loading}
				>
					{loading ? (
						<ActivityIndicator color="#fff" />
					) : (
						<Text style={styles.addButtonText}>Add</Text>
					)}
				</TouchableOpacity>
			</View>

			{successExpense && (
				<View style={styles.successCard}>
					<Text style={styles.successTitle}>✅ Added Successfully!</Text>
					<Text style={styles.successDetail}>
						Amount: ₹{successExpense.amount}
					</Text>
					<Text style={styles.successDetail}>
						Category: {CATEGORY_EMOJIS[successExpense.category]}{" "}
						{successExpense.category}
					</Text>
					<Text style={styles.successDetail}>
						Description: {successExpense.description}
					</Text>
					{successExpense.merchant && (
						<Text style={styles.successDetail}>
							Merchant: {successExpense.merchant}
						</Text>
					)}
				</View>
			)}

			<View style={styles.listHeader}>
				<Text style={styles.listTitle}>Recent Expenses</Text>
			</View>

			<FlatList
				data={expenses}
				renderItem={renderExpenseItem}
				keyExtractor={(item) => item.id.toString()}
				contentContainerStyle={styles.listContent}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
				ListEmptyComponent={
					<View style={styles.emptyState}>
						<Text style={styles.emptyText}>No expenses yet.</Text>
						<Text style={styles.emptySubtext}>Add your first one above!</Text>
					</View>
				}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	header: {
		padding: 20,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#333",
	},
	subtitle: {
		fontSize: 14,
		color: "#666",
		marginTop: 4,
	},
	inputSection: {
		flexDirection: "row",
		padding: 16,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
		gap: 12,
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
		backgroundColor: "#fafafa",
		minHeight: 50,
	},
	addButton: {
		backgroundColor: "#4CAF50",
		borderRadius: 8,
		paddingHorizontal: 24,
		justifyContent: "center",
		alignItems: "center",
		minWidth: 80,
	},
	addButtonDisabled: {
		backgroundColor: "#ccc",
	},
	addButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	successCard: {
		margin: 16,
		padding: 16,
		backgroundColor: "#d4edda",
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#c3e6cb",
	},
	successTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#155724",
		marginBottom: 8,
	},
	successDetail: {
		fontSize: 14,
		color: "#155724",
		marginTop: 4,
	},
	listHeader: {
		padding: 16,
		paddingBottom: 8,
	},
	listTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#333",
	},
	listContent: {
		padding: 16,
		paddingTop: 8,
	},
	expenseItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 8,
		marginBottom: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	expenseLeft: {
		flexDirection: "row",
		flex: 1,
		gap: 12,
	},
	categoryEmoji: {
		fontSize: 32,
	},
	expenseDetails: {
		flex: 1,
	},
	categoryText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#333",
	},
	descriptionText: {
		fontSize: 14,
		color: "#666",
		marginTop: 2,
	},
	merchantText: {
		fontSize: 12,
		color: "#999",
		marginTop: 2,
	},
	timeText: {
		fontSize: 12,
		color: "#999",
		marginTop: 4,
	},
	expenseRight: {
		alignItems: "flex-end",
		justifyContent: "space-between",
	},
	amountText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
	},
	deleteButton: {
		padding: 4,
	},
	deleteButtonText: {
		fontSize: 20,
	},
	emptyState: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 60,
	},
	emptyText: {
		fontSize: 18,
		color: "#999",
		fontWeight: "500",
	},
	emptySubtext: {
		fontSize: 14,
		color: "#bbb",
		marginTop: 8,
	},
});
