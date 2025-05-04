# Development Guide

## Prerequisites
- Node.js and npm
- Local by Flywheel (for WordPress local development)
- Git

## Local Development Setup

### Backend (WordPress)
1. Install Local by Flywheel from [localwp.com](https://localwp.com/)
2. Create a new site named "delaware-dsa-backend"
3. Access the WordPress admin at http://delaware-dsa-backend.local/wp-admin
4. Install and activate required plugins:
   - WPGraphQL
   - PublishPress Authors

### Frontend (Next.js)
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open http://localhost:3000 in your browser

## Deployment
Refer to the deployment documentation for production setup instructions.
