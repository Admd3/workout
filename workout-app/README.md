# Workout Tracker

A 4-day split workout tracker built with React Native (Expo). Track your sets, time your rest periods, and see your progress across all four training days.

## Features

- **4-day split**: Chest & Triceps, Back & Biceps, Shoulders & Core, Legs
- **Set tracking**: Tap checkboxes to mark sets complete
- **Rest timer**: Auto-appears after completing a set — tap to start the countdown
- **Progress persistence**: Your progress saves locally and survives app restarts
- **Day-level progress**: See completion % for each day at a glance

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Expo Go](https://expo.dev/go) app on your phone (iOS or Android)

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/workout-tracker.git
cd workout-tracker

# 2. Install dependencies
npm install

# 3. Start the dev server
npx expo start
```

### Run on your phone

1. Open **Expo Go** on your phone
2. Scan the QR code shown in your terminal
3. The app loads on your phone — done

### Build a standalone APK / IPA

```bash
# Install EAS CLI
npm install -g eas-cli

# Log in to Expo
eas login

# Build for Android (APK)
eas build --platform android --profile preview

# Build for iOS (requires Apple Developer account)
eas build --platform ios --profile preview
```

## Project Structure

```
workout-tracker/
├── App.js                  # Main app with state management
├── data/
│   └── workouts.js         # Workout plan data
├── components/
│   ├── DayTabs.js          # Day selector tabs
│   ├── ExerciseCard.js     # Expandable exercise card
│   └── RestTimer.js        # Countdown rest timer
├── app.json                # Expo config
└── package.json
```

## Customising Your Plan

Edit `data/workouts.js` to change exercises, sets, reps, or rest times. Each exercise object looks like:

```js
{
  name: "Bench Press",
  sets: 4,
  reps: "8-10",
  rest: 90,        // seconds
  muscle: "Chest"
}
```
