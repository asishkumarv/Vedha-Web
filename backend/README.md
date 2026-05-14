# Vedha Backend

Node.js + Express API for Vedha Thrive and VedhaDashboard, backed by PostgreSQL/Neon.

## Local Setup

1. Create a Neon database and copy the pooled or direct PostgreSQL connection string.
2. Create `backend/.env` from `.env.example`.
3. Install dependencies:

```bash
npm install
```

4. Create tables and seed default content:

```bash
npm run db:init
```

5. Start the API:

```bash
npm run dev
```

The API runs at the `PORT` in `.env`, for example `http://localhost:5000`.

## API Routes

- `GET /health`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/site-content`
- `PUT /api/site-content`
- `POST /api/site-content/reset`
- `GET /api/healing-pages`
- `GET /api/healing-pages/:slug`
- `PUT /api/healing-pages/:slug`
- `GET /api/subscriptions`
- `POST /api/subscriptions`
- `PUT /api/subscriptions/:id`
- `DELETE /api/subscriptions/:id`
- `GET /api/subscriptions/me`
- `POST /api/subscriptions/checkout`
- `POST /api/newsletter`
- `GET /api/media-assets`
- `POST /api/media-assets`
- `DELETE /api/media-assets/:id`

## Render + Neon

Use the root `render.yaml` blueprint or create a Render Web Service manually:

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables:
  - `DATABASE_URL`: your Neon PostgreSQL connection string with SSL
  - `CORS_ORIGIN`: comma-separated frontend origins, for example `https://your-dashboard.vercel.app,https://your-site.vercel.app`

After deploying or when changing databases, run this once from Render Shell:

```bash
npm run db:init
```

If dashboard images still show broken local paths after an earlier seed, run:

```bash
npm run db:sync-images
```

For both frontends, set:

```bash
VITE_API_BASE_URL=https://your-render-service.onrender.com/api
```
