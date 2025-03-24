# Einsatz Platform

Einsatz is a platform for connecting businesses with immediately available workers for physical on-site jobs.

## Getting Started with Supabase Integration

This project uses [Supabase](https://supabase.com/) for backend functionality including database storage, authentication, and realtime features.

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- A Supabase account

### Setup

1. **Clone the repository and install dependencies**

```bash
git clone <repository-url>
cd einsatz
npm install
# or
yarn install
```

2. **Set up Supabase**

- Go to [supabase.com](https://supabase.com/) and create a new project
- Once your project is created, navigate to the SQL Editor in the Supabase dashboard
- Copy the contents of `supabase/schema.sql` from this repo and paste it into the SQL Editor
- Run the SQL to set up your database schema

3. **Configure environment variables**

- Copy the `.env.local.example` file to `.env.local`
- Navigate to your Supabase project settings and locate the API keys
- Update `.env.local` with your Supabase URL and anon key:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Supabase Structure

The project uses the following Supabase tables:

- **Workers**: Physical workers/laborers available for jobs
- **Companies**: Business clients who can hire workers
- **Jobs**: Job listings posted by companies
- **Applications**: Join table for workers applying to jobs
- **Reviews**: Ratings and feedback for workers

## Authentication

This project uses Supabase Authentication for user management. We have two types of users:

1. **Workers**: People who offer physical labor services
2. **Companies**: Businesses that need to hire workers

## API Integration

The project uses the Supabase JavaScript client library to interact with the database. You can find the client setup in `src/lib/supabase.ts`.

Worker-related data services are located in `src/services/workerService.ts`.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## Deployment

This project can be deployed using:

- [Vercel](https://vercel.com/) for the frontend
- Supabase for the backend services

Follow the deployment guides for [Next.js on Vercel](https://nextjs.org/docs/deployment) for more details.
# Einsatz2
