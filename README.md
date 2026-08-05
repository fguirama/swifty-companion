# Swifty Companion

Swifty Companion is an Expo / React Native app that lets you search 42 students, view their profile, and inspect their skills and projects through the 42 API.

![App demo](./.img/video.gif)

## Features

- Search for a 42 login
- Display user profile details
- Switch between cursus views
- Browse skills and projects
- Automatic 42 API authentication

## Tech stack

- Expo
- React Native
- Expo Router
- TypeScript
- TanStack Query
- NativeWind

## Requirements

- Node.js
- npm
- Expo Go, Android emulator, iOS simulator, or an Expo development build
- 42 API credentials

## Environment variables

Create a `.env` file at the project root and add:

```bash
EXPO_PUBLIC_CLIENT_ID=your_client_id
EXPO_PUBLIC_CLIENT_SECRET=your_client_secret
```

These values are required to request an access token from the 42 API.

## Installation

```bash
npm install
```

## Running the app

```bash
npm run start
```

Then open the app with one of the Expo options shown in the terminal.

## Available scripts

| Script | Description |
| --- | --- |
| `npm run start` | Start the Expo development server |
| `npm run android` | Run the app on Android |
| `npm run ios` | Run the app on iOS |
| `npm run web` | Run the app in the browser |
| `npm run lint` | Check the code with Expo lint |

## Project structure

```text
src/
  app/         Screens and navigation
  component/   Reusable UI components
  hook/        Shared hooks
  lib/         API clients and data fetching
  providers/   React context providers
  types/       Shared TypeScript types
```
