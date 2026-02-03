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
- **Real-time Updates**: See expenses appear instantly
- **Pull to Refresh**: Keep your expense list up to date
- **Delete Expenses**: Remove expenses with confirmation
- **Cross-platform**: Works on iOS, Android, and Web

## 🛠️ Tech Stack

**Backend:**

- Node.js + Express
- TypeScript
- SQLite (better-sqlite3)
- Groq AI API (or OpenAI/Gemini compatible)

**Mobile:**

- React Native
- Expo
- TypeScript

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
AI_MODEL=llama-3.1-70b-versatile
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

# Add expense
curl -X POST http://localhost:3000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{"input": "spent 500 on coffee at Starbucks"}'

# Get all expenses
curl http://localhost:3000/api/expenses

# Delete expense (replace 1 with actual ID)
curl -X DELETE http://localhost:3000/api/expenses/1
```

## 📂 Project Structure

```
ai-expense-tracker/
├── backend/
│   ├── src/
│   │   ├── database/
│   │   │   └── db.ts              # SQLite setup & CRUD
│   │   ├── routes/
│   │   │   └── expenses.ts        # API endpoints
│   │   ├── services/
│   │   │   └── aiService.ts       # AI parsing logic
│   │   ├── types/
│   │   │   └── index.ts           # TypeScript interfaces
│   │   └── index.ts               # Express server
│   ├── package.json
│   └── .env
│
└── mobile/
    ├── src/
    │   ├── components/            # (future components)
    │   ├── screens/               # (future screens)
    │   ├── services/
    │   │   └── api.ts             # API client
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
- Check backend logs
- Verify database file was created (expenses.db)

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
