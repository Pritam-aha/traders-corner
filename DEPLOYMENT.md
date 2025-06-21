# Deployment Guide for Render

## Prerequisites
- A Render account
- Your project pushed to a Git repository (GitHub, GitLab, etc.)

## Step 1: Prepare Your Repository

1. Make sure your project is pushed to a Git repository
2. Ensure all files are committed and pushed

## Step 2: Deploy to Render

### Option 1: Using Render Dashboard (Recommended)

1. **Sign up/Login to Render**
   - Go to [render.com](https://render.com)
   - Sign up or login to your account

2. **Create New Web Service**
   - Click "New +" button
   - Select "Web Service"
   - Connect your Git repository

3. **Configure the Service**
   - **Name**: `indian-stock-market-tracker` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Choose Free or Paid plan

4. **Set Environment Variables**
   Click on "Environment" tab and add these variables:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_connection_string
   ALPHA_VANTAGE_API_KEY=your_api_key (optional)
   FINNHUB_API_KEY=your_api_key (optional)
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your application

### Option 2: Using render.yaml (Blue-Green Deployment)

If you have the `render.yaml` file in your repository:

1. Follow the same steps as above
2. Render will automatically detect the `render.yaml` file
3. The configuration will be applied automatically

## Step 3: Configure MongoDB (Optional)

If you want to use a real MongoDB database:

1. **Create MongoDB Atlas Cluster** (Free tier available)
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Create a free cluster
   - Get your connection string

2. **Add to Render Environment Variables**
   - Go to your Render service dashboard
   - Navigate to "Environment" tab
   - Add `MONGODB_URI` with your MongoDB connection string

## Step 4: Configure API Keys (Optional)

For real stock data, you can add API keys:

1. **Alpha Vantage API Key**
   - Sign up at [alphavantage.co](https://alphavantage.co)
   - Get your free API key
   - Add as `ALPHA_VANTAGE_API_KEY` in Render

2. **Finnhub API Key**
   - Sign up at [finnhub.io](https://finnhub.io)
   - Get your free API key
   - Add as `FINNHUB_API_KEY` in Render

## Step 5: Access Your Application

Once deployed:
- Your app will be available at: `https://your-app-name.onrender.com`
- The URL will be shown in your Render dashboard

## Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check that all dependencies are in `package.json`
   - Ensure `server.js` is the main entry point

2. **App Not Starting**
   - Check the logs in Render dashboard
   - Verify environment variables are set correctly
   - Ensure PORT is set to 10000 (Render requirement)

3. **Static Files Not Loading**
   - Verify `express.static()` is configured correctly
   - Check file paths in your HTML

### Logs and Monitoring:
- View logs in Render dashboard under "Logs" tab
- Monitor performance in "Metrics" tab

## Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment mode | No | `development` |
| `PORT` | Server port | Yes | `5000` |
| `MONGODB_URI` | MongoDB connection string | No | Local MongoDB |
| `ALPHA_VANTAGE_API_KEY` | Alpha Vantage API key | No | Simulated data |
| `FINNHUB_API_KEY` | Finnhub API key | No | Simulated data |

## Support

If you encounter issues:
1. Check Render documentation: [render.com/docs](https://render.com/docs)
2. View application logs in Render dashboard
3. Verify all environment variables are set correctly 