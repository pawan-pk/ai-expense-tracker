# Architecture Overview

## New Architecture (SQLite in Frontend)

The project has been restructured to move SQLite from the backend to the mobile frontend. This provides several benefits:

### Benefits

- ✅ **Offline Support**: App works without internet connection
- ✅ **Better Performance**: No network latency for CRUD operations
- ✅ **Data Privacy**: User data stays on device
- ✅ **Simpler Backend**: Backend only handles AI parsing
- ✅ **Easier Deployment**: Backend can be deployed on serverless platforms (Vercel, Netlify, etc.)

## Architecture Diagram

```
┌─────────────────────────────────────────┐
│         Mobile App (React Native)       │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │      User Interface (App.tsx)    │  │
│  └──────────────┬───────────────────┘  │
│                 │                       │
│  ┌──────────────▼───────────────────┐  │
│  │   Local SQLite Database          │  │
│  │   (expo-sqlite)                  │  │
│  │   - Create Expense               │  │
│  │   - Read Expenses                │  │
│  │   - Delete Expense               │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │   API Service (api.ts)           │  │
│  │   - Parse with AI only           │  │
│  └──────────────┬───────────────────┘  │
└─────────────────┼───────────────────────┘
                  │
                  │ HTTP Request
                  │ (Only for AI parsing)
                  │
┌─────────────────▼───────────────────────┐
│      Backend (Express.js)               │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │   AI Service (Groq API)          │  │
│  │   - Parse natural language       │  │
│  │   - Extract expense details      │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Data Flow

### Adding an Expense

1. User enters text: "Spent 500 on groceries at BigBazaar"
2. Mobile app sends text to backend `/api/parse`
3. Backend uses Groq AI to parse the text
4. Backend returns structured data:
   ```json
   {
   	"amount": 500,
   	"category": "Food & Dining",
   	"description": "groceries",
   	"merchant": "BigBazaar",
   	"currency": "INR"
   }
   ```
5. Mobile app saves to local SQLite database
6. UI updates immediately

### Reading Expenses

1. App loads expenses from local SQLite database
2. No network request needed
3. Works offline

### Deleting an Expense

1. User deletes expense
2. Removed from local SQLite database
3. No network request needed
4. Works offline

## Technology Stack

### Mobile App

- **Framework**: React Native with Expo SDK 54
- **Database**: expo-sqlite (SQLite for React Native)
- **Language**: TypeScript
- **UI**: React Native components

### Backend

- **Framework**: Express.js
- **AI Service**: Groq API (llama-3.3-70b-versatile)
- **Language**: TypeScript
- **No Database**: Backend is stateless

## File Structure

```
mobile/
├── App.tsx                          # Main app component
├── src/
│   ├── services/
│   │   ├── database.ts             # SQLite operations
│   │   └── api.ts                  # AI parsing API calls
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   └── utils/
│       └── timeAgo.ts              # Time formatting

backend/
├── src/
│   ├── index.ts                    # Express server (AI parsing only)
│   ├── services/
│   │   └── aiService.ts            # Groq AI integration
│   └── types/
│       └── index.ts                # TypeScript interfaces
```

## API Endpoints

### Backend API

#### POST /api/parse

Parse natural language expense input using AI.

**Request:**

```json
{
	"input": "Spent 500 on groceries at BigBazaar"
}
```

**Response:**

```json
{
	"parsed": {
		"amount": 500,
		"currency": "INR",
		"category": "Food & Dining",
		"description": "groceries",
		"merchant": "BigBazaar"
	}
}
```

#### GET /health

Health check endpoint.

**Response:**

```json
{
	"status": "ok",
	"message": "AI Expense Parser API is running"
}
```

## Database Schema

### Mobile SQLite Database

**Table: expenses**

| Column         | Type     | Description                  |
| -------------- | -------- | ---------------------------- |
| id             | INTEGER  | Primary key (auto-increment) |
| amount         | REAL     | Expense amount               |
| currency       | TEXT     | Currency code (default: INR) |
| category       | TEXT     | Expense category             |
| description    | TEXT     | Expense description          |
| merchant       | TEXT     | Merchant name (nullable)     |
| original_input | TEXT     | Original user input          |
| created_at     | DATETIME | Timestamp (auto-generated)   |

## Deployment

### Mobile App

- Build APK/IPA using EAS Build
- Distribute via Google Play Store / Apple App Store
- Or share APK directly for Android

### Backend

- Can be deployed on any Node.js hosting:
  - Vercel (serverless)
  - Netlify Functions
  - Railway
  - Render
  - Heroku
  - AWS Lambda
  - Google Cloud Functions

**Note**: Since the backend no longer uses SQLite, it can be deployed on serverless platforms without issues!

## Environment Variables

### Backend (.env)

```
GROQ_API_KEY=your_groq_api_key_here
PORT=3000
```

### Mobile App

Update `API_BASE_URL` in `src/services/api.ts`:

- For development: Your computer's local IP
- For production: Your deployed backend URL

## Migration Notes

If you have existing data in the old backend database, you'll need to:

1. Export data from backend SQLite
2. Import into mobile app's SQLite database
3. Or start fresh (recommended for new setup)
