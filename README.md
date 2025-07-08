
# Celia Dunsmore Counselling Website

A modern, responsive counselling website built with React and Express.js, featuring online booking and contact forms.

## Features

- Responsive design with React and Tailwind CSS
- Online booking system with calendar integration
- Contact forms with email notifications
- SEO optimized with structured data
- Performance optimized for all devices

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Deployment**: Replit

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables** in Replit Secrets:
   - `DATABASE_URL`: PostgreSQL connection string
   - `SENDGRID_API_KEY`: For email notifications
   - `GOOGLE_CLIENT_ID`: For calendar integration (optional)
   - `GOOGLE_CLIENT_SECRET`: For calendar integration (optional)

3. **Initialize database**:
   ```bash
   npm run db:push
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── client/          # React frontend
├── server/          # Express.js backend
├── shared/          # Shared types and schemas
└── public/          # Static assets
```

## Deployment

This project is configured for Replit deployment. Use the Deploy button in the Replit interface to publish your site.

## License

MIT
