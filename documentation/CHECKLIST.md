# ✅ Setup Checklist

Use this checklist to ensure everything is set up correctly.

## Prerequisites

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Expo CLI installed (`npm install -g expo-cli`)
- [ ] Git installed (optional)

## Backend Setup

- [ ] Navigate to `backend` folder
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Get Groq API key from https://console.groq.com
- [ ] Add API key to `.env` file
- [ ] Run `npm run dev`
- [ ] See "✅ Database initialized" message
- [ ] See "🚀 Server running on http://localhost:3000"
- [ ] Test health endpoint: `curl http://localhost:3000/health`

## Mobile Setup

- [ ] Navigate to `mobile` folder
- [ ] Run `npm install`
- [ ] Determine your setup:
  - [ ] iOS Simulator (use `localhost:3000`)
  - [ ] Android Emulator (use `10.0.2.2:3000`)
  - [ ] Physical Device (find your IP with `ifconfig` or `ipconfig`)
- [ ] Update `API_BASE_URL` in `src/services/api.ts`
- [ ] Run `npm start`
- [ ] Choose platform (i for iOS, a for Android, or scan QR)

## Testing

- [ ] App loads without errors
- [ ] Try adding: "spent 500 on coffee at Starbucks"
- [ ] See success message with parsed details
- [ ] Expense appears in list below
- [ ] Pull down to refresh works
- [ ] Delete button shows confirmation
- [ ] Expense is removed after confirming delete

## Troubleshooting

### Backend Issues

- [ ] Port 3000 is available (not used by another app)
- [ ] AI_API_KEY is valid and has quota
- [ ] No firewall blocking port 3000
- [ ] Check backend console for error messages

### Mobile Issues

- [ ] Backend is running
- [ ] API_BASE_URL is correct for your setup
- [ ] Phone and computer on same WiFi (for physical device)
- [ ] No VPN interfering with connection
- [ ] Check Expo console for error messages

### AI Parsing Issues

- [ ] API key is correct in `.env`
- [ ] API has available quota
- [ ] Input includes an amount (number)
- [ ] Check backend logs for AI response

## Common Errors

**"Network request failed"**

- ✅ Backend is running
- ✅ API_BASE_URL matches your setup
- ✅ Same network (for physical device)

**"Could not parse expense"**

- ✅ AI_API_KEY is set
- ✅ API key is valid
- ✅ Input includes amount

**"Port 3000 already in use"**

- ✅ Change PORT in `.env`
- ✅ Update API_BASE_URL in mobile app

## Success Criteria

You're all set when you can:

- ✅ Add expenses using natural language
- ✅ See AI-parsed details (amount, category, merchant)
- ✅ View expenses in a list
- ✅ Delete expenses
- ✅ Pull to refresh

## Next Steps

Once everything works:

- [ ] Try different expense types
- [ ] Test edge cases (no amount, random text)
- [ ] Customize categories or UI
- [ ] Add new features from README
- [ ] Deploy to production

## Need Help?

1. Check QUICKSTART.md for detailed steps
2. Read README.md for full documentation
3. Review PROJECT_DETAILS.md for architecture
4. Check backend console logs
5. Check Expo console logs

Happy tracking! 💰
