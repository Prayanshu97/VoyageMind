# VoyageMind 

VoyageMind is a modern web app that generates personalized travel itineraries using Google Gemini AI and Mapbox. It helps users plan trips with hotel recommendations, daily itineraries, and interactive maps.

## Live Demo  
[VoyageMind](https://voyage-mind.vercel.app/)


## Features
- **AI-powered trip planning**: Get custom itineraries for any destination, number of days, budget, and travel group.
- **Hotel recommendations**: See top hotels with maps, prices, and ratings.
- **Day-by-day itinerary**: Morning, afternoon, and evening plans for each day, with details and images.
- **Beautiful UI**: Responsive, modern design with loading skeletons for a smooth experience.
- **Google authentication**: Secure sign-in to save and view your trips.
- **Persistent storage**: Trips are saved to Firebase Firestore.

## Tech Stack
- React + Vite
- Tailwind CSS
- Firebase (Firestore)
- Google Gemini AI (via @google/genai)
- Mapbox API
- Wikipedia API (for place images)

## Getting Started

### 1. Clone the repository
```bash
git clone <repo-url>
cd ai-travel-planner
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root with the following:
```
# Google Gemini AI API Key
VITE_GEMINI_API=your_google_gemini_api_key_here

# Mapbox API Key
VITE_MAPBOX_API=your_mapbox_api_key_here

# Google OAuth Client ID
VITE_GOOGLE_AUTH_ID=your_google_oauth_client_id_here

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Run the app
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or as shown in your terminal).

## Usage
1. **Sign in with Google** to save your trips.
2. **Create a trip**: Enter your destination, number of days, budget, and travel group.
3. **View your trip**: See hotel recommendations and a detailed itinerary. Click on hotels or places to view them on Google Maps.
4. **My Trips**: View all your saved trips.
