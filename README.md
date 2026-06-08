# GitHub Repo Explorer

A modern, full-stack web application built to explore GitHub user profiles, repositories, and language statistics. 
Features a polished, responsive UI inspired by SaaS dashboards, with a backend proxy handling API requests and caching.

## Features

- **GitHub Profile Search**: Enter a username to instantly fetch and display profile data.
- **Recent Searches**: Remembers the 5 most recently searched profiles for quick navigation.
- **Dynamic Repository List**: View repositories with details like stars, language, description, and topics.
- **Detailed Repository Info**: Expand repository cards to view additional metrics like open issues and the default branch.
- **Pagination**: "Load More" functionality to seamlessly fetch and navigate through all of a user's repositories.
- **Filtering & Sorting**: Instantly filter repositories by name or language, and sort by stars, name, or last updated.
- **Language Analytics**: Visual breakdown of a user's top programming languages using a Recharts pie chart.
- **Performance Optimized**: Node.js backend proxy handles rate limits, caching responses for 60 seconds.
- **Modern UI/UX**: Built with Tailwind CSS and Radix UI primitives for a sleek, responsive, and accessible experience. Dark mode is fully supported.
- **Robust Error Handling**: Gracefully handles "User Not Found" and API rate limit errors.

## Tech Stack

### Frontend
- React 19 + Vite
- TypeScript
- Tailwind CSS v4
- shadcn/ui (Radix Primitives)
- TanStack Query (React Query)
- Axios
- Recharts (Data Visualization)
- Lucide React (Icons)

### Backend
- Node.js + Express
- TypeScript
- Axios
- node-cache (In-memory caching)

## Folder Structure

```
Github-Repo-Explorer/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── api/            # Axios API client
│   │   ├── components/     # UI components (Cards, Search, Charts)
│   │   ├── hooks/          # React Query hooks
│   │   ├── layouts/        # Layout wrappers
│   │   ├── lib/            # Utility functions (cn, etc.)
│   │   ├── pages/          # Main route components
│   │   └── types/          # TypeScript interfaces
│   └── ...
└── server/                 # Backend Node.js application
    ├── src/
    │   ├── cache/          # node-cache configuration
    │   ├── controllers/    # Route controllers
    │   ├── middleware/     # Express middleware (Error handling)
    │   ├── routes/         # API routes
    │   ├── services/       # External API services (GitHub API wrapper)
    │   ├── types/          # TypeScript interfaces
    │   └── utils/          # Helper classes (AppError)
    └── ...
```

## Local Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- Optional: A GitHub Personal Access Token (for higher rate limits)

### 1. Setup Backend
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file by copying the template:
   ```bash
   cp .env.example .env
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server will run on http://localhost:5000*

### 2. Setup Frontend
1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and set the backend URL:
  
4. Start the frontend development server: npm run dev
## API Documentation

The backend exposes the following REST API endpoints:

### `GET /api/github/:username`
Fetches the GitHub profile data for the specified username.
- **Response**: GitHub User object
- **Cache**: 60 seconds

### `GET /api/github/:username/repos?page=1`
Fetches the public repositories for the specified username.
- **Query Params**: `page` (optional, default: 1)
- **Response**: Array of GitHub Repository objects
- **Cache**: 60 seconds

## Future Improvements

- Include commit history visualization and activity heatmaps.
- Implement Redis for scalable, distributed caching.
- Add user authentication to allow users to link their own GitHub accounts directly.
