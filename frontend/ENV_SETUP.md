# Environment Configuration Guide

This project uses environment variables to configure the backend API URL, making it easy to switch between local development and deployed backends.

## Environment Files

### `.env` (Main Configuration)

The main environment file that sets the default backend URL. Currently configured for the deployed backend:

```
VITE_API_BASE_URL=https://scaips-backend.onrender.com
```

### `.env.local` (Local Development Override)

Create this file to override the main configuration for local development:

```
VITE_API_BASE_URL=http://localhost:5000
```

### `.env.production` (Production Build)

Used specifically for production builds:

```
VITE_API_BASE_URL=https://scaips-backend.onrender.com
```

## How to Switch Between Backends

### For Local Development:

1. Copy `.env.example.local` to `.env.local`:
   ```bash
   cp .env.example.local .env.local
   ```
2. The app will now use your local backend at `http://localhost:5000`

### For Deployed Backend:

1. Delete or rename `.env.local` file
2. The app will use the deployed backend at `https://scaips-backend.onrender.com`

### Or Edit `.env` directly:

```bash
# For local development
VITE_API_BASE_URL=http://localhost:5000

# For deployed backend
VITE_API_BASE_URL=https://scaips-backend.onrender.com
```

## Environment Variable Priority

Vite loads environment variables in this order (higher priority overrides lower):

1. `.env.local` (highest priority, not committed to git)
2. `.env.development` (development mode)
3. `.env.production` (production mode)
4. `.env` (lowest priority, committed to git)

## Important Notes

- Environment variables must be prefixed with `VITE_` to be accessible in the frontend
- Restart the development server after changing environment variables
- `.env.local` is ignored by git (safe for local overrides)
- The main `.env` file is committed to git with production defaults

## Verification

To verify which backend URL is being used, check the browser console for API requests:

```
🌐 API Request: GET https://your-backend-url/api/posts
```

The URL shown will indicate which backend is currently configured.
