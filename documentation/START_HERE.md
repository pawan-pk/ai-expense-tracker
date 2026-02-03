# 🎯 START HERE

**Welcome to the AI Expense Tracker!** This is your starting point.

## What is this?

A full-stack mobile app that lets you add expenses using natural language like "spent 500 on coffee" and AI automatically categorizes them.

**Example:**

- You type: "uber to airport 450"
- AI understands: Transport category, ₹450, Uber
- Saved automatically!

## Quick Start (5 minutes)

### Option 1: Automated Setup

```bash
cd ai-expense-tracker
./setup.sh
```

Then follow the on-screen instructions.

### Option 2: Manual Setup

**Step 1: Backend**

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your Groq API key (get free at https://console.groq.com)
npm run dev
```

**Step 2: Mobile** (in a new terminal)

```bash
cd mobile
npm install
# Edit src/services/api.ts and set correct API_BASE_URL
npm start
```

## What You Need

- ✅ Node.js 18+ installed
- ✅ npm installed
- ✅ Groq API key (free at https://console.groq.com)
- ✅ Expo Go app (for testing on phone)

## Project Structure

```
ai-expense-tracker/
├── 📱 mobile/          React Native app (Expo)
├── 🖥️  backend/         Node.js API server
└── 📚 Documentation    You are here!
```

## Documentation Guide

**Just want to get started?**
→ Follow the Quick Start above, then read [QUICKSTART.md](QUICKSTART.md)

**Want to understand what was built?**
→ Read [SETUP_COMPLETE.md](SETUP_COMPLETE.md)

**Having issues?**
→ Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

**Want all the details?**
→ Read [README.md](README.md)

**Need a checklist?**
→ Use [CHECKLIST.md](CHECKLIST.md)

**Want to understand the code?**
→ Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) and [DATA_FLOW.md](DATA_FLOW.md)

**Lost in documentation?**
→ Check [INDEX.md](INDEX.md)

## Tech Stack

- **Mobile**: React Native + Expo + TypeScript
- **Backend**: Node.js + Express + TypeScript
- **Database**: SQLite
- **AI**: Groq API (free tier available)

## Features

✅ Natural language input
✅ AI-powered categorization
✅ 8 expense categories
✅ Real-time updates
✅ Pull to refresh
✅ Delete with confirmation
✅ Works on iOS, Android, Web

## Next Steps

1. **Setup**: Follow Quick Start above
2. **Verify**: Use [CHECKLIST.md](CHECKLIST.md) to verify everything works
3. **Test**: Try adding expenses like:
   - "spent 500 on coffee at Starbucks"
   - "uber to office 350"
   - "Netflix subscription 649"
4. **Customize**: Add your own features!

## Common Issues

**"Network request failed"**

- Make sure backend is running
- Check API_BASE_URL in mobile/src/services/api.ts
- For physical device, use your computer's IP address

**"Could not parse expense"**

- Add your AI_API_KEY to backend/.env
- Get free key at https://console.groq.com

**More issues?**

- Read [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

## File Overview

| File                   | Purpose                      |
| ---------------------- | ---------------------------- |
| **START_HERE.md**      | You are here! Quick overview |
| **QUICKSTART.md**      | Detailed setup guide         |
| **README.md**          | Complete documentation       |
| **CHECKLIST.md**       | Setup verification           |
| **TROUBLESHOOTING.md** | Problem solving              |
| **SETUP_COMPLETE.md**  | What was built               |
| **PROJECT_SUMMARY.md** | Technical details            |
| **DATA_FLOW.md**       | How data flows               |
| **INDEX.md**           | Documentation index          |
| **setup.sh**           | Automated setup script       |

## Support

- 📖 Read the documentation files
- 🔍 Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- 📝 Review code comments
- 🧪 Run backend/test-api.sh to test API

## Time to Complete

- Setup: 5-10 minutes
- Testing: 5 minutes
- Understanding: 15-30 minutes
- **Total: ~30 minutes to fully working app**

## What Makes This Special?

- ✨ No forms! Just type naturally
- 🤖 AI does the categorization
- 📱 Works on any device
- 🚀 Fast setup
- 💯 TypeScript for safety
- 📚 Comprehensive docs

## Ready?

```bash
# Let's go!
cd ai-expense-tracker
./setup.sh
```

Or follow the Quick Start at the top of this file.

---

**Questions?** Check [INDEX.md](INDEX.md) to find the right documentation for your needs.

**Stuck?** Read [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for solutions.

**Want details?** Read [README.md](README.md) for everything.

Happy expense tracking! 💰
