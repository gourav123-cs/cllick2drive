Click2Drive — Hourly & Monthly Car Rentals (Prototype)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses Tailwind CSS and Framer Motion.

## Environment

Create `.env.local` (copy from the template below):

```env
NEXT_PUBLIC_APP_NAME=Click2Drive
NEXT_PUBLIC_DEFAULT_CITY=Delhi
NEXT_PUBLIC_ENABLE_TELEMETRY=false
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js. After import, set environment variables from `.env.local`.

One‑click deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgourav123-cs%2Fcllick2drive.git)

Required env vars (add in Vercel dashboard after import):
- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_DEFAULT_CITY`
- `NEXT_PUBLIC_ENABLE_TELEMETRY`
- `NEXT_PUBLIC_BASE_URL` (set to the deployed URL after the first deploy)

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
