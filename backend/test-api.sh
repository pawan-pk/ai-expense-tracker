#!/bin/bash

echo "🧪 Testing AI Expense Tracker API"
echo "=================================="
echo ""

BASE_URL="http://localhost:3000"

# Test 1: Health Check
echo "1️⃣  Testing health endpoint..."
curl -s $BASE_URL/health | jq '.'
echo ""
echo ""

# Test 2: Add Expense
echo "2️⃣  Adding expense: 'spent 500 on coffee at Starbucks'..."
RESPONSE=$(curl -s -X POST $BASE_URL/api/expenses \
  -H "Content-Type: application/json" \
  -d '{"input": "spent 500 on coffee at Starbucks"}')
echo $RESPONSE | jq '.'
EXPENSE_ID=$(echo $RESPONSE | jq -r '.expense.id')
echo ""
echo ""

# Test 3: Get All Expenses
echo "3️⃣  Getting all expenses..."
curl -s $BASE_URL/api/expenses | jq '.'
echo ""
echo ""

# Test 4: Delete Expense
if [ ! -z "$EXPENSE_ID" ] && [ "$EXPENSE_ID" != "null" ]; then
  echo "4️⃣  Deleting expense with ID: $EXPENSE_ID..."
  curl -s -X DELETE $BASE_URL/api/expenses/$EXPENSE_ID | jq '.'
  echo ""
  echo ""
fi

echo "✅ Tests complete!"
echo ""
echo "Note: If you see errors, make sure:"
echo "  - Backend server is running (npm run dev)"
echo "  - AI_API_KEY is set in .env file"
echo "  - jq is installed (brew install jq)"
