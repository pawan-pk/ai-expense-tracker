# 🚀 Quick Start Guide

Follow these steps to get your AI Expense Tracker running in minutes!

## Step 1: Install Backend Dependencies

```bash
cd ai-expense-tracker/backend
npm install
```

## Step 2: Setup Environment Variables

```bash
cp .env.example .env
```

Then edit `.env` and add your Groq API key:

```env
AI_API_KEY=your_groq_api_key_here
```

**Don't have a Groq API key?**

1. Visit https://console.groq.com
2. Sign up (it's free!)
3. Go to API Keys
4. Create new key
5. Copy and paste into .env

## Step 3: Start Backend

```bash
npm run dev
```

You should see:

```
✅ Database initialized
🚀 Server running on http://localhost:3000
📊 Health check: http://localhost:3000/health
```

## Step 4: Test Backend (Optional)

Open a new terminal and test:

```bash
curl http://localhost:3000/health
```

Should return: `{"status":"ok","message":"AI Expense Tracker API is running"}`

## Step 5: Install Mobile Dependencies

Open a new terminal:

```bash
cd ai-expense-tracker/mobile
npm install
```

## Step 6: Configure API URL

**Important:** Edit `mobile/src/services/api.ts` and update `API_BASE_URL`:

- **iOS Simulator**: Keep as `http://localhost:3000`
- **Android Emulator**: Change to `http://10.0.2.2:3000`
- **Physical Device**: Change to your computer's IP (e.g., `http://192.168.1.5:3000`)

To find your IP:

```bash
# Mac/Linux
ifconfig | grep "inet "

# Windows
ipconfig
```

## Step 7: Start Mobile App

```bash
npm start
```

Then:

- Press `i` for iOS
- Press `a` for Android
- Scan QR with Expo Go app for physical device

## 🎉 You're Done!

Try adding an expense:

- "spent 500 on coffee at Starbucks"
- "uber to office 350"
- "Netflix 649"

## ⚠️ Common Issues

**"Network request failed"**

- Check backend is running
- Verify API_BASE_URL is correct
- For physical device, ensure phone and computer are on same WiFi

**"Could not parse expense"**

- Check AI_API_KEY in backend/.env
- Verify API key is valid
- Check backend console for errors

**Port 3000 already in use**

- Change PORT in backend/.env to 3001
- Update API_BASE_URL in mobile app accordingly

## 📚 Next Steps

- Read the full README.md for detailed documentation
- Check PROJECT_DETAILS.md for architecture details
- Start customizing the app!
