#!/bin/bash

echo "🚀 AI Expense Tracker - Setup Script"
echo "====================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Setup Backend
echo "📦 Setting up backend..."
cd backend

if [ ! -f "package.json" ]; then
    echo "❌ Backend package.json not found!"
    exit 1
fi

echo "   Installing backend dependencies..."
npm install

if [ ! -f ".env" ]; then
    echo "   Creating .env file..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: Edit backend/.env and add your AI_API_KEY"
    echo "   Get a free key at: https://console.groq.com"
    echo ""
fi

cd ..

# Setup Mobile
echo "📱 Setting up mobile app..."
cd mobile

if [ ! -f "package.json" ]; then
    echo "❌ Mobile package.json not found!"
    exit 1
fi

echo "   Installing mobile dependencies..."
npm install

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Add your AI API key to backend/.env:"
echo "   cd backend"
echo "   nano .env  # or use your favorite editor"
echo ""
echo "2. Start the backend:"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "3. In a new terminal, start the mobile app:"
echo "   cd mobile"
echo "   npm start"
echo ""
echo "4. Update mobile/src/services/api.ts with correct API_BASE_URL"
echo "   - iOS Simulator: http://localhost:3000"
echo "   - Android Emulator: http://10.0.2.2:3000"
echo "   - Physical Device: http://YOUR_IP:3000"
echo ""
echo "📚 Read QUICKSTART.md for detailed instructions"
echo ""
