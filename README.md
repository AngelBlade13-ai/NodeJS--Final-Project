# Movie Search Database

Server-rendered Node/Express app with login, favorites, and TMDB search.

## Run
1. `npm install`
2. Copy `src/.env.example` to `src/.env` and fill in the values.
3. `npm start`
4. Open `http://localhost:3000`

## Routes
- `/` home page (trending)
- `/movies/search?query=...` (login required)
- `/movies/:id` (login required)
- `/favorites` (login required)
- `/profile` (login required)
- `/admin` (requires `ADMIN_EMAIL`)
- `/auth/register`
- `/auth/login`
- `/auth/logout` (POST)

## Environment Variables
- `MONGODB_URI`
- `SESSION_SECRET`
- `TMDB_API_KEY`
- `ADMIN_EMAIL` (email for admin access)

## Structure
- `src/server.js`
- `src/routes/`
- `src/controllers/`
- `src/models/`
- `src/views/`
- `public/`
