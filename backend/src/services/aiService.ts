import { ParsedExpense } from "../types";

const SYSTEM_PROMPT = `You are an expense parser. Extract expense information from natural language input.

RULES:
1. Extract the amount as a number (no currency symbols)
2. Default currency is INR unless explicitly mentioned (USD, EUR, etc.)
3. Categorize into EXACTLY one of these categories:
   - Food & Dining (restaurants, cafes, food delivery, groceries)
   - Transport (uber, ola, taxi, fuel, parking, metro)
   - Shopping (clothes, electronics, amazon, flipkart)
   - Entertainment (movies, netflix, spotify, games)
   - Bills & Utilities (electricity, water, internet, phone)
   - Health (medicine, doctor, gym, pharmacy)
   - Travel (flights, hotels, trips)
   - Other (anything that doesn't fit above)
4. Description should be a clean summary (not the raw input)
5. Merchant is the company/store name if mentioned, null otherwise

RESPOND ONLY WITH VALID JSON, no other text:
{
  "amount": <number>,
  "currency": "<string>",
  "category": "<string>",
  "description": "<string>",
  "merchant": "<string or null>"
}

If the input is invalid or you cannot extract an amount, respond:
{
  "error": "Could not parse expense. Please include an amount.",
  "amount": null
}`;

export async function parseExpense(text: string): Promise<ParsedExpense> {
	// Read env variables inside the function to ensure dotenv has loaded
	const AI_API_KEY = process.env.AI_API_KEY || "";
	const AI_API_URL =
		process.env.AI_API_URL || "https://api.groq.com/openai/v1/chat/completions";
	const AI_MODEL = process.env.AI_MODEL || "llama-3.3-70b-versatile";

	try {
		console.log(`🔑 Using AI Model: ${AI_MODEL}`);
		console.log(`🔑 API Key present: ${AI_API_KEY ? "Yes" : "No"}`);
		console.log(
			`🔑 API Key (first 10 chars): ${AI_API_KEY.substring(0, 10)}...`,
		);

		const response = await fetch(AI_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${AI_API_KEY}`,
			},
			body: JSON.stringify({
				model: AI_MODEL,
				messages: [
					{ role: "system", content: SYSTEM_PROMPT },
					{ role: "user", content: text },
				],
				temperature: 0.1,
				max_tokens: 200,
			}),
		});

		if (!response.ok) {
			const errorBody = await response.text();
			console.error(`❌ AI API Error Response: ${errorBody}`);
			throw new Error(`AI API error: ${response.statusText}`);
		}

		const data = (await response.json()) as any;
		const content = data.choices[0]?.message?.content as string;

		if (!content) {
			throw new Error("No response from AI");
		}

		console.log(`✅ AI Response: ${content}`);
		const parsed = JSON.parse(content) as ParsedExpense;

		// Validate response
		if (parsed.error || parsed.amount === null) {
			return {
				amount: null,
				currency: "INR",
				category: "Other",
				description: "",
				merchant: null,
				error: parsed.error || "Could not parse expense",
			};
		}

		// Set defaults
		return {
			amount: parsed.amount,
			currency: parsed.currency || "INR",
			category: parsed.category || "Other",
			description: parsed.description || text,
			merchant: parsed.merchant || null,
		};
	} catch (error) {
		console.error("❌ Error parsing expense:", error);
		return {
			amount: null,
			currency: "INR",
			category: "Other",
			description: "",
			merchant: null,
			error: "Failed to parse expense. Please try again.",
		};
	}
}
