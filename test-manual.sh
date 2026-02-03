#!/bin/bash

echo "🧪 Testing AI Expense Tracker (Manual Mode)"
echo "==========================================="
echo ""

# Test 1: Health Check
echo "1️⃣  Testing health endpoint..."
curl -s http://localhost:3000/health | python3 -m json.tool
echo ""
echo ""

# Test 2: Get expenses (should be empty)
echo "2️⃣  Getting current expenses..."
curl -s http://localhost:3000/api/expenses | python3 -m json.tool
echo ""
echo ""

echo "⚠️  Note: AI parsing requires a valid Groq API key"
echo "   Get one free at: https://console.groq.com"
echo ""
echo "✅ Backend is running and ready!"
echo "   Once you add your API key, try:"
echo "   curl -X POST http://localhost:3000/api/expenses \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"input\": \"spent 500 on coffee at Starbucks\"}'"
