# 🔧 Troubleshooting Guide

Common issues and their solutions.

## Backend Issues

### ❌ "Port 3000 already in use"

**Solution:**

```bash
# Option 1: Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Option 2: Change the port
# Edit backend/.env and change PORT=3000 to PORT=3001
# Then update mobile/src/services/api.ts accordingly
```

### ❌ "AI_API_KEY is not defined"

**Solution:**

```bash
cd backend
cp .env.example .env
# Edit .env and add your API key
nano .env  # or use your favorite editor
```

Get a free API key at: https://console.groq.com

### ❌ "Database error" or "SQLITE_ERROR"

**Solution:**

```bash
# Delete the database and let it recreate
cd backend
rm expenses.db
npm run dev  # Will create fresh database
```

### ❌ "Module not found" errors

**Solution:**

```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### ❌ Backend starts but AI parsing fails

**Check:**

1. API key is valid: Test at https://console.groq.com
2. API has quota remaining
3. Check backend console for detailed error
4. Try a different AI model in .env

**Test API directly:**

```bash
curl -X POST https://api.groq.com/openai/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.1-70b-versatile",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

## Mobile App Issues

### ❌ "Network request failed"

**Most common issue!**

**Solution:**

1. Verify backend is running: `curl http://localhost:3000/health`
2. Check API_BASE_URL in `mobile/src/services/api.ts`

**For iOS Simulator:**

```typescript
const API_BASE_URL = "http://localhost:3000";
```

**For Android Emulator:**

```typescript
const API_BASE_URL = "http://10.0.2.2:3000";
```

**For Physical Device:**

```typescript
// Find your IP first
// Mac/Linux: ifconfig | grep "inet "
// Windows: ipconfig

const API_BASE_URL = "http://192.168.1.5:3000"; // Use your actual IP
```

### ❌ "Unable to resolve module"

**Solution:**

```bash
cd mobile
rm -rf node_modules package-lock.json
npm install
# Clear Expo cache
npx expo start -c
```

### ❌ App crashes on startup

**Solution:**

```bash
# Clear Expo cache and restart
cd mobile
npx expo start -c

# If still failing, check for TypeScript errors
npx tsc --noEmit
```

### ❌ "Expo Go app not connecting"

**Solution:**

1. Ensure phone and computer are on same WiFi
2. Disable VPN on both devices
3. Check firewall isn't blocking Expo
4. Try scanning QR code again
5. Try tunnel mode: `npx expo start --tunnel`

### ❌ Expenses not showing after adding

**Solution:**

1. Pull down to refresh
2. Check backend console for errors
3. Verify expense was saved: `curl http://localhost:3000/api/expenses`
4. Check mobile console for errors

## AI Parsing Issues

### ❌ "Could not parse expense"

**Common causes:**

1. No amount in input (e.g., "coffee" instead of "coffee 50")
2. AI API error (check backend logs)
3. Invalid API key
4. API quota exceeded

**Solution:**

```bash
# Check backend logs for AI response
# Try these test inputs:
curl -X POST http://localhost:3000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{"input": "spent 500 on coffee"}'
```

### ❌ Wrong category assigned

**This is expected sometimes!** AI isn't perfect.

**To improve:**

1. Be more specific: "coffee at Starbucks" vs "coffee"
2. Include merchant name
3. Use common terms: "uber" instead of "cab"

### ❌ Amount not extracted correctly

**Solution:**

- Use clear numbers: "500" not "five hundred"
- Include currency if not INR: "50 USD"
- Avoid ambiguous formats: "5.5k" might fail

## Installation Issues

### ❌ "npm install" fails

**Solution:**

```bash
# Clear npm cache
npm cache clean --force

# Try with legacy peer deps
npm install --legacy-peer-deps

# Or use yarn instead
npm install -g yarn
yarn install
```

### ❌ "tsx: command not found"

**Solution:**

```bash
cd backend
npm install tsx --save-dev
```

### ❌ "expo: command not found"

**Solution:**

```bash
npm install -g expo-cli
# Or use npx
npx expo start
```

## Platform-Specific Issues

### iOS Simulator

**Issue:** "localhost" not working
**Solution:** Use `http://localhost:3000` (should work)

**Issue:** Simulator not opening
**Solution:**

```bash
# Open Xcode and install simulators
xcode-select --install
```

### Android Emulator

**Issue:** "localhost" not working
**Solution:** Use `http://10.0.2.2:3000` instead

**Issue:** Emulator not starting
**Solution:**

```bash
# Check Android Studio is installed
# Open Android Studio > AVD Manager > Start emulator
```

### Physical Device

**Issue:** Can't connect to backend
**Solution:**

1. Find your computer's IP:

   ```bash
   # Mac/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1

   # Windows
   ipconfig | findstr IPv4
   ```

2. Update API_BASE_URL to `http://YOUR_IP:3000`
3. Ensure both devices on same WiFi
4. Check firewall allows port 3000

## Testing Issues

### ❌ test-api.sh fails

**Solution:**

```bash
# Install jq if missing
brew install jq  # Mac
apt-get install jq  # Linux

# Make script executable
chmod +x backend/test-api.sh

# Run with bash explicitly
bash backend/test-api.sh
```

## Performance Issues

### ❌ AI parsing is slow (>5 seconds)

**Causes:**

1. Slow internet connection
2. AI API server load
3. Wrong API endpoint

**Solution:**

- Try different AI model in .env
- Check internet speed
- Consider caching common expenses

### ❌ App is laggy

**Solution:**

1. Test on physical device (simulators are slower)
2. Reduce console.log statements
3. Enable Hermes engine (already enabled in Expo)

## Data Issues

### ❌ Lost all expenses

**Solution:**

```bash
# Database is in backend/expenses.db
# Check if file exists
ls -la backend/expenses.db

# If deleted, it will recreate empty on next start
```

### ❌ Want to reset database

**Solution:**

```bash
cd backend
rm expenses.db
npm run dev  # Creates fresh database
```

### ❌ Want to backup expenses

**Solution:**

```bash
# Backup database file
cp backend/expenses.db backend/expenses.backup.db

# Or export as JSON
curl http://localhost:3000/api/expenses > expenses.json
```

## Still Having Issues?

1. **Check logs:**
   - Backend: Terminal where `npm run dev` is running
   - Mobile: Expo console in terminal
   - Mobile errors: Shake device > Show Dev Menu > Debug

2. **Verify setup:**
   - Use CHECKLIST.md to verify each step
   - Ensure all dependencies installed
   - Check Node.js version: `node --version` (should be 18+)

3. **Test components separately:**
   - Test backend: `curl http://localhost:3000/health`
   - Test AI: Check backend logs when adding expense
   - Test mobile: Try with mock data first

4. **Common fixes:**

   ```bash
   # Nuclear option - reinstall everything
   cd backend
   rm -rf node_modules package-lock.json
   npm install

   cd ../mobile
   rm -rf node_modules package-lock.json
   npm install
   npx expo start -c
   ```

5. **Get help:**
   - Check backend console output
   - Check Expo console output
   - Read error messages carefully
   - Google the specific error message

## Prevention Tips

- Always check backend is running before starting mobile app
- Keep API key secure and valid
- Test on simulator before physical device
- Use TypeScript to catch errors early
- Check logs regularly during development

---

**Still stuck?** Review the error message carefully and check which component is failing (backend, mobile, or AI).
