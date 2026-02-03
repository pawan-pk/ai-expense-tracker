# 💰 AI Expense Tracker

A full-stack expense tracking app that uses AI to parse natural language input and automatically categorize expenses.

## 📱 App Preview

<table>
<tr>
<td width="50%">

### iOS Preview

<video src="./ios-preview.mp4" width="100%" controls></video>

</td>
<td width="50%">

### Android Preview

<video src="./android-preview.mp4" width="100%" controls></video>

</td>
</tr>
</table>

## 📚 Documentation

All detailed documentation is available in the [`documentation/`](documentation/) folder:

- [START_HERE.md](documentation/START_HERE.md) - Quick start guide
- [QUICKSTART.md](documentation/QUICKSTART.md) - Fast setup instructions
- [TROUBLESHOOTING.md](documentation/TROUBLESHOOTING.md) - Common issues and solutions
- [INDEX.md](documentation/INDEX.md) - Complete documentation index

## 🎯 Features

- **Natural Language Input**: Just type "spent 500 on coffee" and AI handles the rest
- **Automatic Categorization**: AI categorizes expenses into 8 categories
- **Offline Storage**: All expenses stored locally on your device with SQLite
- **Works Offline**: View and delete expenses without internet (only AI parsing needs internet)
- **Real-time Updates**: See expenses appear instantly
- **Pull to Refresh**: Keep your expense list up to date
- **Delete Expenses**: Remove expenses with confirmation
- **Cross-platform**: Works on iOS, Android, and Web
- **Privacy First**: Your data stays on your device

## 🛠️ Tech Stack

**Backend:**

- Node.js + Express
- TypeScript
- Groq AI API (llama-3.3-70b-versatile)
- Stateless (no database)

**Mobile:**

- React Native with Expo SDK 54
- TypeScript
- expo-sqlite (local SQLite database)
- Offline-first architecture

## 📋 Prerequisites

- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- AI API key (Groq, OpenAI, or compatible service)

## 🚀 Setup Instructions

### 1. Clone and Install

```bash
cd ai-expense-tracker
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
```

Edit `.env` and add your AI API key:

```env
PORT=3000
AI_API_KEY=your_groq_api_key_here
AI_API_URL=https://api.groq.com/openai/v1/chat/completions
AI_MODEL=llama-3.3-70b-versatile
```

**Get a Groq API Key (Free):**

1. Go to https://console.groq.com
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste into your .env file

Start the backend:

```bash
npm run dev
```

The server will run on http://localhost:3000

### 3. Mobile App Setup

```bash
cd ../mobile
npm install
```

**Important:** Update the API URL in `src/services/api.ts`:

- **iOS Simulator**: Use `http://localhost:3000`
- **Android Emulator**: Use `http://10.0.2.2:3000`
- **Physical Device**: Use your computer's local IP (e.g., `http://192.168.1.5:3000`)

To find your local IP:

- Mac/Linux: `ifconfig | grep "inet "`
- Windows: `ipconfig`

Start the app:

```bash
npm start
```

Then:

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## 📱 Usage

1. Type an expense in natural language:
   - "Spent 850 on lunch at Taj"
   - "uber to airport 450"
   - "Netflix subscription 649"
   - "bought shoes 4500"

2. Tap "Add" and watch AI parse it automatically

3. View your expenses in the list below

4. Pull down to refresh

5. Tap 🗑️ to delete an expense

## 🧪 Testing the Backend

Test with curl:

```bash
# Health check
curl http://localhost:3000/health

# Parse expense with AI
curl -X POST http://localhost:3000/api/parse \
  -H "Content-Type: application/json" \
  -d '{"input": "spent 500 on coffee at Starbucks"}'
```

Expected response:

```json
{
	"parsed": {
		"amount": 500,
		"currency": "INR",
		"category": "Food & Dining",
		"description": "Coffee",
		"merchant": "Starbucks"
	}
}
```

## 📂 Project Structure

```
ai-expense-tracker/
├── backend/
│   ├── src/
│   │   ├── services/
│   │   │   └── aiService.ts       # AI parsing logic (Groq API)
│   │   ├── types/
│   │   │   └── index.ts           # TypeScript interfaces
│   │   └── index.ts               # Express server (AI parsing only)
│   ├── package.json
│   └── .env
│
└── mobile/
    ├── src/
    │   ├── services/
    │   │   ├── database.ts        # SQLite operations (local storage)
    │   │   └── api.ts             # AI parsing API client
    │   ├── types/
    │   │   └── index.ts           # TypeScript interfaces
    │   └── utils/
    │       └── timeAgo.ts         # Time formatting
    ├── App.tsx                    # Main app component
    └── package.json
```

## 🎨 Categories

The AI categorizes expenses into:

- 🍔 Food & Dining
- 🚗 Transport
- 🛒 Shopping
- 📺 Entertainment
- 📄 Bills & Utilities
- 💊 Health
- ✈️ Travel
- 📦 Other

## 🔧 Troubleshooting

**Backend won't start:**

- Check if port 3000 is available
- Verify AI_API_KEY is set in .env
- Run `npm install` again

**Mobile app can't connect:**

- Check API_BASE_URL in `src/services/api.ts`
- Ensure backend is running
- For physical device, use your computer's local IP
- Check firewall settings

**AI parsing fails:**

- Verify API key is valid
- Check API quota/limits
- Look at backend console for error messages

**Expenses not showing:**

- Pull down to refresh
- Check if database initialized (restart app if needed)
- Check console logs for errors

## 📖 Architecture

The app uses an **offline-first architecture**:

1. **User Input** → Mobile app
2. **AI Parsing** → Backend API (requires internet)
3. **Local Storage** → SQLite on device (works offline)
4. **Display** → Mobile app (works offline)

**Benefits:**

- ✅ Works offline (except AI parsing)
- ✅ Fast performance (no network latency for CRUD)
- ✅ Privacy (data stays on device)
- ✅ Simple backend (stateless, easy to deploy)

See [ARCHITECTURE.md](documentation/ARCHITECTURE.md) for detailed architecture documentation.

## 🔄 Migration from Old Version

If you're upgrading from the old version where SQLite was in the backend, see [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) for detailed migration instructions.

## 🚀 Next Steps

Ideas for enhancement:

- [ ] Add expense editing
- [ ] Category-wise spending summary
- [ ] Date range filtering
- [ ] Export to CSV
- [ ] Charts and analytics
- [ ] Budget tracking
- [ ] Receipt photo upload
- [ ] Multi-currency support
- [ ] User authentication

## 📝 License

MIT - Feel free to use this for your own projects!

## 🙏 Acknowledgments

Built with AI assistance to demonstrate natural language processing in expense tracking.
