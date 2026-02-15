# MEME Sound Board 🔊

A dead-simple, playful meme soundboard app built with React Native and Expo. Tap buttons to play fun sound effects instantly.

## Features

- 🎵 **24 Unique Sounds** - From memes to reactions, all your favorite sounds in one place
- 🌙 **Dark Mode Only** - Beautiful dark theme designed for comfort
- ✨ **Smooth Animations** - Satisfying button press animations and active sound glow effects
- 📱 **Native Feel** - Haptic feedback on every tap
- 🚀 **Lightning Fast** - Instant sound playback with no delays
- 🎯 **One Screen** - No navigation, no clutter, just pure fun

## Sounds Included

- 🗣️ abe sale
- 🟥 among us
- 🦗 cricket
- 👶 baby laugh
- 🍆 baigan
- 🤨 bruh
- 🚶 chaloo
- 🧪 dexter
- 🔔 ding
- 🎭 dun dun
- 🤷 ehhh
- ❌ error
- 😤 fahhh
- 💨 fart
- 😂 laugh
- 🔫 gunshot
- 😮 haaa
- 😏 lekin ye
- 🦆 quack
- 😎 rizz
- 🐱 sad meow
- 👋 slap
- 🕷️ spiderman
- 🧽 spongebob

## Tech Stack

- **React Native** - Cross-platform mobile framework
- **Expo** - Managed workflow for rapid development
- **Expo AV** - Audio playback
- **Expo Haptics** - Tactile feedback
- **TypeScript** - Type-safe development
- **Expo Router** - File-based routing

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn
- Expo CLI (optional, can use npx)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd meme-sound-board
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on your device:
   - **iOS**: Press `i` in the terminal or scan QR code with Camera app
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go app
   - **Web**: Press `w` in the terminal

## Building for Production

This project is configured for EAS Build (Expo Application Services).

### Setup EAS

1. Install EAS CLI globally:
```bash
npm install -g eas-cli
```

2. Login to your Expo account:
```bash
eas login
```

3. Configure the project:
```bash
eas build:configure
```

4. Update `app.json` with your project ID after running `eas build:configure`

### Build Commands

**Development Build:**
```bash
eas build --profile development --platform ios
eas build --profile development --platform android
```

**Preview Build (for testing):**
```bash
eas build --profile preview --platform ios
eas build --profile preview --platform android
```

**Production Build:**
```bash
eas build --profile production --platform ios
eas build --profile production --platform android
```

**Build for both platforms:**
```bash
eas build --profile production --platform all
```

### Submitting to App Stores

**iOS (App Store):**
```bash
eas submit --platform ios
```

**Android (Google Play):**
```bash
eas submit --platform android
```

## Project Structure

```
meme-sound-board/
├── app/
│   ├── _layout.tsx      # Root layout with navigation
│   └── index.tsx        # Main soundboard screen
├── assets/
│   ├── images/          # App icons and splash screens
│   └── sounds/          # Audio files (24 MP3 files)
├── app.json             # Expo configuration
├── eas.json             # EAS Build configuration
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript configuration
```

## Configuration

### App Metadata

- **Name**: MEME Sound Board
- **Bundle ID (iOS)**: `com.meme-sound-board.app`
- **Package (Android)**: `com.meme-sound-board.app`
- **Version**: 1.0.0
- **Orientation**: Portrait only

### Customization

To add new sounds:
1. Add MP3 files to `assets/sounds/`
2. Update `soundFiles` object in `app/index.tsx`
3. Add sound entry to `SOUNDS` array with emoji and label

## Development

### Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- Functional components with hooks
- Minimal dependencies
- Clean, readable code

## Design Philosophy

meme-sound-board follows a minimalist design philosophy:

- **Honest** - No ads, no tracking, no BS
- **Playful** - Emotionally warm and fun
- **Simple** - One screen, one purpose
- **Fast** - Instant sound playback
- **Beautiful** - Dark mode, smooth animations

## Support

For issues or questions, please open an issue in the repository.

---
