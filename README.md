# Movie Search Database

A server-rendered Node.js and Express movie search app. Users can register, log in, search movies through the TMDB API, view movie details, save favorites, and manage profile/admin pages. The app uses EJS views, Express sessions, bcrypt password hashing, and MongoDB through Mongoose.

This was built as a Node.js final project to practice MVC structure, authentication, sessions, external API calls, and persistent user data.

## Features

- EJS-rendered pages
- User registration and login
- Password hashing with bcrypt
- Express session authentication
- TMDB movie search
- Movie detail pages
- User-specific favorite movies
- Profile page
- Admin route gated by configured admin email
- MongoDB/Mongoose models for users and favorites
- Static CSS and starter frontend assets

## Tech Stack

- Node.js
- Express
- EJS
- MongoDB
- Mongoose
- bcryptjs
- express-session
- dotenv
- TMDB API
- node-fetch fallback
- nodemon for development

## Project Structure

```text
public/
  index.html
  styles.css
src/
  server.js
  .env.example
  controllers/
  middleware/
  models/
    User.js
    Favorite.js
  routes/
  views/
    partials/
```

## Environment Variables

Copy the example file:

```bash
copy src\.env.example src\.env
```

Fill in:

```env
MONGODB_URI=your_connection_string
SESSION_SECRET=any_long_string
TMDB_API_KEY=your_tmdb_key
ADMIN_EMAIL=admin@example.com
```

Notes:

- `MONGODB_URI` is needed for registration, login, and favorites.
- `TMDB_API_KEY` is needed for movie search and movie detail pages.
- `ADMIN_EMAIL` controls which logged-in user can access the admin page.

## How To Run

Install dependencies:

```bash
npm install
```

Start normally:

```bash
npm start
```

Start with nodemon:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Main Routes

```text
GET  /                         Home page
GET  /auth/register            Registration form
POST /auth/register            Create account
GET  /auth/login               Login form
POST /auth/login               Log in
POST /auth/logout              Log out
GET  /movies/search?query=...  Search TMDB movies
GET  /movies/:id               View one movie
GET  /favorites                View saved favorites
POST /favorites                Add favorite
POST /favorites/delete         Remove favorite
GET  /profile                  User profile
GET  /admin                    Admin page
```

Some routes require a logged-in session.

## How It Works

1. A user registers or logs in.
2. The server stores the user's ID and email in the session.
3. Movie searches call the TMDB API using `TMDB_API_KEY`.
4. Search results are rendered with EJS.
5. Favorite movies are saved in MongoDB by user ID.
6. Admin access is limited to the email configured in `ADMIN_EMAIL`.

## Notes

- If `MONGODB_URI` is missing, the server starts but database-backed features will not work correctly.
- If `TMDB_API_KEY` is missing, search and detail pages show an error message.
- This is a school project and does not include production-grade session storage, CSRF protection, or deployment hardening.

## What I Practiced

- Building an Express MVC-style app
- Rendering pages with EJS
- Hashing passwords and checking login credentials
- Protecting routes with middleware
- Calling an external API from the server
- Saving user-specific data in MongoDB
- Managing environment-based configuration
