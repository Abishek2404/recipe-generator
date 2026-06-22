# Vercel Deployment Guide - AI Food Recipe

## Prerequisites
- GitHub account with your project repository
- Vercel account (free at vercel.com)
- Node.js installed locally

## Step 1: Push Project to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/ai-food-recipe.git
git push -u origin main
```

---

## Step 2: Deploy Backend (Server)

### Option A: Deploy Entire Repository

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New..." → "Project"**
3. Select your GitHub repository
4. **Configure Settings:**
   - **Framework Preset:** Node.js
   - **Root Directory:** `Server/`
   - **Build Command:** (leave empty - Node.js doesn't need build)
   - **Output Directory:** (leave empty)

5. Click **"Environment Variables"** and add:
   ```
   MONGODB_URI = your_mongodb_connection_string
   GROQ_API_KEY = your_groq_api_key
   ```

6. Click **"Deploy"** and wait for completion

**Your backend URL will be something like:** `https://your-project.vercel.app`

---

## Step 3: Deploy Frontend (Client)

### Option A: Same Project (Monorepo)

1. Go to Vercel Dashboard → Your Project → **"Settings"**
2. Click **"Root Directory"** → change to `Client/`
3. **Redeploy**

### Option B: Separate Project

1. Create a new Vercel project
2. Connect the same GitHub repo
3. **Configure Settings:**
   - **Framework:** Vite
   - **Root Directory:** `Client/`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. Add **Environment Variables:**
   ```
   VITE_API_URL = https://your-backend-project.vercel.app
   ```

5. Click **"Deploy"**

---

## Step 4: Update Frontend API Configuration

Update your frontend to use the Vercel backend URL. Modify `Client/src/main.jsx` or your API configuration:

```javascript
// Set API base URL based on environment
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Use this in your axios requests:
axios.create({
  baseURL: API_URL
});
```

Or create an `.env.production` file in Client folder:
```
VITE_API_URL=https://your-backend-project.vercel.app
```

---

## Step 5: Enable CORS for Frontend

Ensure your **Server/index.js** allows your frontend domain:

```javascript
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend-project.vercel.app"
  ],
  credentials: true
}));
```

---

## Step 6: Verify Deployment

1. **Backend Health Check:** 
   - Visit `https://your-backend.vercel.app/api/health`

2. **Frontend:**
   - Visit `https://your-frontend.vercel.app`
   - Open DevTools (F12) → Network tab
   - Test image upload & recipe generation
   - Check API calls go to your backend

---

## Troubleshooting

### Backend not connecting to MongoDB
- Verify `MONGODB_URI` in Vercel Environment Variables
- Check MongoDB Atlas network access (allow all IPs: 0.0.0.0/0)

### CORS errors
- Add frontend URL to CORS allowed origins in `Server/index.js`
- Ensure credentials are properly configured

### API requests return 404
- Verify backend URL in frontend `.env.production`
- Check that API routes match between frontend and backend

### Groq API errors
- Verify `GROQ_API_KEY` is correctly set in Vercel
- Check Groq account has API credits

---

## Environment Variables to Add in Vercel

### Backend (Server):
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `GROQ_API_KEY` - Your Groq API key

### Frontend (Client):
- `VITE_API_URL` - Backend Vercel URL (e.g., `https://backend.vercel.app`)

---

## Files Modified for Vercel

✅ `Server/vercel.json` - Created
✅ `Server/index.js` - Updated to export module
✅ `Client/vercel.json` - Created
