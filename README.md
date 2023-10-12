# Impact Nutriction Consult

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[http://localhost:3000/api/hello](http://localhost:3000/api/hello) is an endpoint that uses [Route Handlers](https://beta.nextjs.org/docs/routing/route-handlers). This endpoint can be edited in `app/api/hello/route.ts`.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Todos

//Todo Fix security issues
//Add animation to the homepage === Dela done
//Show attendee and allow attendees update on the dashboard === partially done
// include payment method ==== done
// Add dashboard responsiveness =====
//Add payment method === partially done
// use proper state management system ==== done

// send an email to the user when they decide to attend an event letting them know that they have registered
// Allow a user to delete the registration for an event === .
// only events that are not done should be attended ====
// allow admins to update the system to make a user pay for an event ==== done
// add a temporary payment method where the admins validate the user's payment ==== done
// add a chat system for the page users to communicate directly with the admins.
// Add help page with an explanation of how to use the system.
// Add login with Google functionality and ensure it works well with the app.

## Get started

### Set up database

- [Install psql](https://www.timescale.com/blog/how-to-install-psql-on-mac-ubuntu-debian-windows/)

- If you are on windows, kindly use [wsl 2](https://learn.microsoft.com/en-us/windows/wsl/install) and you can continue from the steps below.
- Run

```bash
   sudo apt-get update
   sudo apt install postgresql postgresql-contrib
   sudo -i -u postgres
   CREATE ROLE your_username WITH
   LOGIN
   CREATEDB
   CREATEROLE;
```

### Update the sample.env to .env.local file with your details

```bash
DATABASE_URL="postgresql://ursername:password@localhost:5432/db_name?schema=public"
NEXTAUTH_SECRET=RXeV5QUbhDXeF6LnYVFIy0pRRDKE2oJuvAQlMydsdR4=
NEXTAUTH_URL=http://localhost:3000
EMAIL=email@gmail.com
PASS=odsvsxeshhtzgdfdf
LOCALURL=http://localhost:3000
```

### Initialize prisma

```bash
    npm install
    npm run prisma-generate
    npm run prisma-reset
    npm run seed
```

You can now start your server

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
