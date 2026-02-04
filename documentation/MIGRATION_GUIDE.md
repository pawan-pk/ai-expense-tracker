# Migration Guide: SQLite Moved to Frontend

## What Changed?

The project architecture has been updated to move SQLite from the backend to the mobile frontend. This provides offline support and better performance.

## Changes Summary

### Backend Changes

- ✅ Removed SQLite database (`better-sqlite3`)
- ✅ Removed database operations (create, read, delete)
- ✅ Removed `/api/expenses` routes
- ✅ Backend now only provides AI parsing via `/api/parse`
- ✅ Can now be deployed on serverless platforms (Vercel, Netlify, etc.)

### Mobile App Changes

- ✅ Added `expo-sqlite` for local database
- ✅ Added `src/services/database.ts` for SQLite operations
- ✅ Updated `src/services/api.ts` to only call AI parsing endpoint
- ✅ Updated `App.tsx` to use local database
- ✅ App now works offline (except for AI parsing)

## How to Use the Updated App

### 1. Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend will start on `http://localhost:3000` and provide:

- `GET /health` - Health check
- `POST /api/parse` - AI expense parsing

### 2. Mobile App Setup

```bash
cd mobile
npm install
npx expo start
```

### 3. Update API URL (Important!)

Edit `mobile/src/services/api.ts` and update `API_BASE_URL`:

```typescript
// For development on physical device
const API_BASE_URL = "http://YOUR_COMPUTER_IP:3000";

// For Android emulator
const API_BASE_URL = "http://10.0.2.2:3000";

// For iOS simulator
const API_BASE_URL = "http://localhost:3000";

// For production
const API_BASE_URL = "https://your-backend-url.com";
```

## Testing the Changes

### Test Backend AI Parsing

```bash
curl -X POST http://localhost:3000/api/parse \
  -H "Content-Type: application/json" \
  -d '{"input": "Spent 500 on groceries at BigBazaar"}'
```

Expected response:

```json
{
	"parsed": {
		"amount": 500,
		"currency": "INR",
		"category": "Food & Dining",
		"description": "Groceries",
		"merchant": "BigBazaar"
	}
}
```

### Test Mobile App

1. Start the backend: `cd backend && npm run dev`
2. Start the mobile app: `cd mobile && npx expo start`
3. Open the app on your device/emulator
4. Try adding an expense: "Spent 200 on uber ride"
5. The expense should be saved locally and appear in the list
6. Close the app and reopen - expenses should still be there (offline storage!)

## Benefits of New Architecture

### ✅ Offline Support

- View expenses without internet
- Delete expenses offline
- Only need internet for AI parsing

### ✅ Better Performance

- No network latency for CRUD operations
- Instant UI updates
- Faster app loading

### ✅ Data Privacy

- User data stays on device
- No server-side storage
- User controls their data

### ✅ Simpler Backend

- Stateless backend
- No database management
- Easier to scale

### ✅ Easier Deployment

- Backend can run on serverless platforms
- No need for persistent storage
- Lower hosting costs

## Deployment Options

### Backend Deployment

Since the backend no longer uses SQLite, you can deploy it anywhere:

**Serverless Options:**

- Vercel (recommended)
- Netlify Functions
- AWS Lambda
- Google Cloud Functions

**Traditional Hosting:**

- Railway
- Render
- Heroku
- DigitalOcean

### Mobile App Deployment

Build and distribute the app:

```bash
cd mobile

# Build for Android
eas build --platform android --profile preview

# Build for iOS
eas build --platform ios --profile preview
```

## Troubleshooting

### Issue: "Database not initialized"

**Solution**: The app initializes the database on first launch. If you see this error, restart the app.

### Issue: "Failed to parse expense"

**Solution**:

1. Check if backend is running
2. Verify API_BASE_URL in `api.ts`
3. Check your internet connection
4. Verify GROQ_API_KEY in backend `.env`

### Issue: Expenses not persisting

**Solution**: The SQLite database is stored locally. If you uninstall the app, data will be lost. This is expected behavior.

### Issue: Can't connect to backend from physical device

**Solution**:

1. Make sure your phone and computer are on the same WiFi network
2. Use your computer's local IP address (not localhost)
3. Check firewall settings

## Data Migration (If Needed)

If you have existing data in the old backend database:

1. Export from backend SQLite:

```bash
cd backend
sqlite3 expenses.db ".dump expenses" > expenses.sql
```

2. Convert to JSON:

```bash
sqlite3 expenses.db "SELECT * FROM expenses" -json > expenses.json
```

3. Import into mobile app (you'll need to write a custom import script)

**Note**: For most users, starting fresh is recommended.

## Rollback (If Needed)

If you need to rollback to the old architecture:

```bash
git checkout <previous-commit-hash>
cd backend && npm install
cd mobile && npm install
```

## Questions?

Check the documentation:

- `documentation/ARCHITECTURE.md` - New architecture details
- `documentation/QUICKSTART.md` - Quick start guide
- `documentation/TROUBLESHOOTING.md` - Common issues

## Summary

The new architecture provides a better user experience with offline support and faster performance. The backend is now simpler and easier to deploy. All data is stored locally on the user's device, giving them full control over their data.
