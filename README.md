# Movie Guider 2

Movie Guider 2 is a React movie discovery app powered by TMDB data. It lets users browse trending, popular, movie, TV, and actor pages; inspect detailed movie/TV/person profiles; watch trailers; search across media; and save items to a local watchlist.

## Features

- Cinematic Home page with a featured weekly title
- Trending, Popular, Movies, TV Shows, and Actors listing pages
- Infinite scrolling grids for large result sets
- Movie and TV detail pages with overview, metadata, trailers, providers, recommendations, and similar titles
- Actor detail pages with biography, social links, personal info, combined credits, and filtered movie/TV credits
- Debounced global search with keyboard navigation and recent searches
- LocalStorage watchlist with bookmark buttons
- Dedicated `/watchlist` page
- Rating and year filters for Movies and TV Shows
- Active sidebar navigation
- Responsive layouts for desktop and mobile
- Shimmer skeleton loading UI
- Empty and error states with retry actions
- Route fade transitions

## Tech Stack

- React 19
- Vite 6
- React Router
- Redux Toolkit
- React Redux
- Axios
- Tailwind CSS 4
- React Icons
- React Infinite Scroll Component
- React Player
- ESLint

## Project Structure

```txt
MovieGuider2/
|-- public/
|   |-- No_Image.png
|   |-- NotFanimeg.png
|   `-- loader assets
|-- src/
|   |-- components/
|   |   |-- Home.jsx
|   |   |-- Movie.jsx
|   |   |-- MovieDetails.jsx
|   |   |-- People.jsx
|   |   |-- PersonDetails.jsx
|   |   |-- Popular.jsx
|   |   |-- Trending.jsx
|   |   |-- TvDetails.jsx
|   |   |-- TvShows.jsx
|   |   |-- Watchlist.jsx
|   |   `-- partials/
|   |-- hooks/
|   |   `-- useWatchlist.js
|   |-- store/
|   |   |-- actions/
|   |   |-- reducers/
|   |   `-- store.jsx
|   |-- utils/
|   |   |-- axios.jsx
|   |   `-- watchlist.js
|   |-- App.jsx
|   |-- index.css
|   `-- main.jsx
|-- package.json
`-- vite.config.js
```

## Getting Started

### Prerequisites

Install Node.js and npm.

Recommended:

```bash
node --version
npm --version
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Vite will print the local URL, usually:

```txt
http://localhost:5173
```

### Build For Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Lint

```bash
npm run lint
```

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates a production build in `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint across the project |

## Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/trending` | Trending titles |
| `/popular` | Popular titles |
| `/movie` | Movies |
| `/movie/details/:id` | Movie details |
| `/movie/details/:id/trailer` | Movie trailer modal |
| `/tv` | TV Shows |
| `/tv/details/:id` | TV details |
| `/tv/details/:id/trailer` | TV trailer modal |
| `/person` | Popular actors |
| `/person/details/:id` | Actor details |
| `/watchlist` | Saved watchlist |
| `*` | 404 page |

## API

The app uses The Movie Database API through the Axios instance in:

```txt
src/utils/axios.jsx
```

Current endpoints include:

- `/trending/{category}/{duration}`
- `/movie/{category}`
- `/movie/{id}`
- `/tv/{category}`
- `/tv/{id}`
- `/person/popular`
- `/person/{id}`
- `/search/multi`

Note: the project currently includes a TMDB bearer token directly in `src/utils/axios.jsx`. For production, move this value into an environment variable such as `VITE_TMDB_TOKEN`.

## Watchlist

The watchlist is stored locally in the browser with `localStorage`.

Files:

```txt
src/hooks/useWatchlist.js
src/utils/watchlist.js
src/components/Watchlist.jsx
```

Users can add or remove movies and TV shows using bookmark buttons on cards and detail pages.

## Loading, Empty, And Error States

The app uses a shared shimmer loading component:

```txt
src/components/partials/Loading.jsx
```

It supports variants:

- `detail` default layout for Home/detail-style screens
- `grid` layout for listing pages

Shared empty/error UI lives in:

```txt
src/components/partials/StateMessage.jsx
```

## Styling

Most UI styling uses Tailwind utility classes directly in components. Global styling is kept in:

```txt
src/index.css
```

This file includes:

- Tailwind import
- scrollbar styling
- select/dropdown styling
- shimmer animation
- route fade animation

## Notes For Future Improvements

- Move the TMDB API token into `.env`
- Add genre filters using TMDB genre endpoints
- Add pagination state to URL query params
- Add toast notifications for watchlist actions
- Add unit tests for watchlist utilities
- Add accessibility improvements for modal focus management

## License

This project is for learning and portfolio use. Add a license file if you plan to publish or distribute it.
