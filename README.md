# Workout Tracker

A 4-day split workout tracker that runs in your browser and works offline. Save it to your home screen and it behaves like a native app.

## Setup (5 minutes)

### 1. Create a GitHub repo
- Go to [github.com/new](https://github.com/new)
- Name it `workout-tracker`
- Make it **Public**
- Click **Create repository**

### 2. Upload the files
- On your new repo page, click **"uploading an existing file"**
- Drag in all 4 files: `index.html`, `sw.js`, `manifest.json`, and this `README.md`
- Click **Commit changes**

### 3. Enable GitHub Pages
- Go to your repo's **Settings** tab
- Click **Pages** in the left sidebar
- Under "Source", select **Deploy from a branch**
- Choose **main** branch and **/ (root)** folder
- Click **Save**
- Wait ~1 minute, then your app is live at: `https://YOUR_USERNAME.github.io/workout-tracker/`

### 4. Save to your phone's home screen
- Open the URL above in **Safari** (iPhone) or **Chrome** (Android)
- **iPhone**: Tap the Share button → "Add to Home Screen"
- **Android**: Tap the 3-dot menu → "Add to Home Screen"
- It now launches fullscreen like a real app

## Features
- 4-day split: Chest & Triceps, Back & Biceps, Shoulders & Core, Legs
- Tap exercises to expand and check off individual sets
- Rest timer after each completed set
- Progress bar per day
- Saves your progress locally (survives closing the app)
- Works offline once loaded
- Reset button to clear a day's progress

## Customising
Edit the `WORKOUTS` array in `index.html` to change exercises, sets, reps, or rest times.
