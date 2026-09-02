# Routine Designer - Frontend Prototype

A frontend-only Angular prototype demonstrating the Routine Designer user flow through 6 interactive screens.

## Features

- 6-screen workflow: Focus Area → Intake → As-Is → Calibration → To-Be → Daily Run
- Built with Angular 19 (standalone components)
- Styled with Tailwind CSS v4 + custom RD design tokens
- Mock in-memory data (no backend)
- Inter font family
- Fully runnable demo with click-through navigation

## Getting Started

### Prerequisites

- Node.js 22.x
- npm 10.x

### Installation

```bash
npm install
```

### Running the App

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically redirect to the first screen (Focus Area).

### Building for Production

```bash
npm run build
```

Build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/app/
├── core/
│   └── session/              # Design session state management
├── features/
│   ├── focus-area/           # Screen 1: Choose focus area
│   ├── intake/               # Screen 2: Select pain points
│   ├── as-is/                # Screen 3: Map current loop
│   ├── calibration/          # Screen 4: Confirm bottleneck
│   ├── to-be/                # Screen 5: Design target loop
│   └── daily-run/            # Screen 6: 7-day tracking
├── layout/
│   └── design-shell/         # Progress stepper + chrome
└── shared/
    └── ui/                   # Reusable components
```

## Design System

The prototype uses custom RD design tokens defined in `src/styles/tokens.css` and mapped to Tailwind utilities.

Key colors:
- Accent: `#4F46E5` (indigo)
- Stage colors: Cue (indigo), Environment (sky), Friction (rose)
- Bottleneck: `#D97706` (amber)

## Demo Flow

The prototype is pre-loaded with a "Morning Energy" sample routine, so every screen is viewable immediately via deep-link:

1. **Focus Area** (`/design/focus-area`) - Select from 3 focus areas
2. **Intake** (`/design/intake`) - Toggle pain point chips
3. **As-Is** (`/design/as-is`) - Edit loop stages, view bottleneck
4. **Calibration** (`/design/calibration`) - Confirm bottleneck detection
5. **To-Be** (`/design/to-be`) - Define outcome + target loop
6. **Daily Run** (`/design/daily-run`) - Track 7-day check-ins with Yes/No toggles

## Notes

- This is a **frontend-only prototype**
- All data is mocked in-memory via Angular signals
- No HTTP calls to any backend API
- Navigation works via Next/Back buttons or manual URL changes
