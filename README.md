# Delaware DSA Website

A modern website for the Delaware chapter of the Democratic Socialists of America (DSA). 

## Technology Stack

### Backend
- WordPress (Headless Mode)
- WPGraphQL
- MariaDB
- Redis (for production caching)
- PublishPress Authors (for multi-author management)

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Apollo Client (optional for complex data fetching)

### Infrastructure
- Local by Flywheel (local development)
- GridPane (WordPress hosting)
- Vercel (Next.js hosting)
- GitHub Actions (CI/CD)
- Cloudflare (CDN and security)

## Directory Structure
- `/backend` - WordPress headless CMS files
- `/frontend` - Next.js application
- `/docs` - Documentation
- `/scripts` - Utility scripts
- `/.github` - GitHub Actions workflow configurations

## Getting Started
See the [Development Guide](./docs/development-guide.md) for setup instructions.
