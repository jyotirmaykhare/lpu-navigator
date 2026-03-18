[LPU Navigator]

A comprehensive campus navigation and information platform for LPU, featuring interactive maps, AR/3D campus views, smart suggestions, chatbot, notifications, events, user profiles, and more.

---

## Project Structure

```
lpu-navigator/
├── public/                # Static assets (index.html, robots.txt)
├── server/                # Express backend (index.js, package.json)
├── src/                   # Main frontend source
│   ├── App.tsx            # App entry, routing, theme
│   ├── main.tsx           # Vite entry point
│   ├── components/        # UI & feature components
│   │   ├── ARCampus3D.tsx # 3D/AR campus view (placeholder)
│   │   ├── CampusMap.tsx  # Leaflet map integration
│   │   ├── Chatbot.tsx    # Chatbot UI
│   │   ├── GoogleMap.tsx  # (removed)
│   │   ├── MapCluster.tsx # Map clustering
│   │   ├── Navbar.tsx     # Navigation bar
│   │   ├── NavLink.tsx    # Navigation link
│   │   ├── SmartSuggestions.tsx # Suggestions
│   │   └── ui/            # shadcn-ui components
│   ├── data/              # Static/location data
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Route pages (Index, MapPage, Facilities, Events, etc.)
│   └── test/              # Tests (example.test.ts, setup.ts)
├── vite.config.ts         # Vite config
├── tailwind.config.ts     # Tailwind config
├── eslint.config.js       # ESLint config
├── tsconfig*.json         # TypeScript configs
├── package.json           # Frontend dependencies/scripts
├── README.md              # Project documentation
└── ...                    # Other configs and docs
```

---

## Technologies Used

### Frontend
- **React** (18.3.1)
- **TypeScript** (5.8.3)
- **Vite** (5.4.19)
- **Tailwind CSS** (3.4.17)
- **shadcn-ui** (Radix UI components)
- **react-leaflet** (maps)
- **leaflet-routing-machine** (routing)
- **@tanstack/react-query** (data fetching)
- **react-router-dom** (routing)
- **recharts** (charts)
- **lucide-react** (icons)
- **date-fns** (date utils)
- **cmdk** (command palette)
- **zod** (validation)
- **sonner** (notifications)
- **vaul** (UI)
- **embla-carousel-react** (carousel)
- **next-themes** (theme switching)
- **class-variance-authority**, **clsx** (class utilities)
- **input-otp** (OTP input)

### Backend
- **Express** (4.18.2)
- **CORS** (2.8.5)

### Dev & Testing
- **Vitest** (unit tests)
- **Playwright** (e2e tests)
- **ESLint** (linting)
- **Testing Library** (React/Jest DOM)
- **TypeScript ESLint**
- **lovable-tagger** (component tagging)
- **PostCSS**

---

## Features
- Interactive campus map with routing and clustering
- 3D/AR campus view (placeholder for future integration)
- Smart suggestions for navigation and campus info
- Chatbot for student queries
- Notifications, events, and user profile management
- Facilities info and issue reporting
- Responsive UI with dark mode

---

## Getting Started

### Prerequisites
- Node.js (recommend using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Install & Run
```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd lpu-navigator

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend
```sh
cd server
npm install
npm start
```

### Build
```sh
npm run build
```

### Preview
```sh
npm run preview
```

### Lint
```sh
npm run lint
```

### Test
```sh
npm run test
```

---

## Deployment
- Deploy frontend with Vite/React (compatible with Vercel, Netlify, Railway, etc.)
- Backend (Express) can be deployed separately (Railway, Heroku, etc.)

---

## Custom Domain
- Supported via platform settings (see docs)

---

## License
This project is for educational purposes at LPU.

---

## Credits
- Built with React, Vite, Tailwind, shadcn-ui, and more.
- See package.json and server/package.json for full dependency list.
