# 🧪 Testing Guide

## Current Status

✅ **Backend Running**: http://localhost:3000
✅ **Database Working**: SQLite initialized
✅ **API Responding**: All endpoints functional
⚠️ **AI Key Needed**: Update your Groq API key

## Quick Test Results

```bash
# Health Check
curl http://localhost:3000/health
# ✅ Returns: {"status":"ok","message":"AI Expense Tracker API is running"}

# Get Expenses
curl http://localhost:3000/api/expenses
# ✅ Returns: {"success":true,"expenses":[]}
```

## 🔑 Get Your Free Groq API Key

1. Visit: https://console.groq.com
2. Sign up (free account)
3. Navigate to "API Keys"
4. Click "Create API Key"
5. Copy the key

## 📝 Update Your API Key

Edit `backend/.env`:

```bash
AI_API_KEY=your_new_groq_api_key_here
```

The backend will automatically reload!

## 🧪 Test AI Parsing

Once you have a valid API key:

```bash
curl -X POST http://localhost:3000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{"input": "spent 500 on coffee at Starbucks"}'
```

Expected response:

```json
{
	"success": true,
	"expense": {
		"id": 1,
		"amount": 500,
		"currency": "INR",
		"category": "Food & Dining",
		"description": "Coffee at Starbucks",
		"merchant": "Starbucks",
		"original_input": "spent 500 on coffee at Starbucks",
		"created_at": "2025-02-03T..."
	}
}
```

## 📱 Start Mobile App

### Option 1: iOS Simulator (Mac only)

```bash
cd mobile
npm start
# Press 'i' for iOS simulator
```

### Option 2: Android Emulator

```bash
cd mobile
npm start
# Press 'a' for Android emulator
```

### Option 3: Physical Device

1. Install "Expo Go" app on your phone
2. Run: `cd mobile && npm start`
3. Scan the QR code with:
   - iOS: Camera app
   - Android: Expo Go app

**Important**: Update `mobile/src/services/api.ts`:

- iOS Simulator: `http://localhost:3000`
- Android Emulator: `http://10.0.2.2:3000`
- Physical Device: `http://YOUR_COMPUTER_IP:3000`

## 🎯 Test Cases

Once everything is running:

### Test 1: Add Expense

Input: "spent 850 on lunch at Taj"
Expected: Food & Dining, ₹850, Taj

### Test 2: Transport

Input: "uber to airport 450"
Expected: Transport, ₹450, Uber

### Test 3: Entertainment

Input: "Netflix subscription 649"
Expected: Entertainment, ₹649, Netflix

### Test 4: Shopping

Input: "bought shoes 4500"
Expected: Shopping, ₹4500

### Test 5: Invalid Input

Input: "coffee" (no amount)
Expected: Error message

## 🐛 Troubleshooting

### Backend Issues

**"Unauthorized" error**

- Your API key is invalid
- Get a new one from https://console.groq.com

**"Port 3000 already in use"**

```bash
lsof -ti:3000 | xargs kill -9
```

### Mobile Issues

**"Network request failed"**

- Check backend is running
- Verify API_BASE_URL in `mobile/src/services/api.ts`
- For physical device, use your computer's IP

**Find your IP:**

```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

## 📊 Current Backend Process

Backend is running as Process ID: 2

To check logs:

```bash
# View in real-time
tail -f backend/logs (if logging to file)

# Or check the terminal where npm run dev is running
```

To stop backend:

- Press Ctrl+C in the terminal
- Or kill the process

## ✅ What's Working

- ✅ Express server
- ✅ CORS enabled
- ✅ SQLite database
- ✅ Health check endpoint
- ✅ GET /api/expenses
- ✅ DELETE /api/expenses/:id
- ⚠️ POST /api/expenses (needs valid API key)

## 🚀 Next Steps

1. **Get API Key**: https://console.groq.com
2. **Update .env**: Add your new key
3. **Test AI**: Try adding an expense
4. **Start Mobile**: Run `npm start` in mobile folder
5. **Test Full Flow**: Add expenses from the app!

## 📞 Need Help?

- Check TROUBLESHOOTING.md
- Review backend logs
- Verify API key is valid
- Ensure backend is running

Happy testing! 🎉
