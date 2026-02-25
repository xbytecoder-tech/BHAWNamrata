# Podcast Booking Website

A podcast booking website for business owners, entrepreneurs, and women in their second innings.

## Features

- Story-led homepage with benefits and call to action
- Experience page with 3 tiered packages
- Booking page with form fields and slot selection cards
- Coupon input and payment/confirmation placeholders
- Responsive layout for phones, tablets, and desktops
- Semi-contrast, gradient-driven visual styling

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Deploy / Hosting

### Option 1: Vercel (recommended)

1. Push this project to GitHub/GitLab/Bitbucket.
2. Import the repo in Vercel.
3. Framework preset: `Next.js` (auto-detected).
4. Build command: `npm run build`.
5. Output: `.next` (default for Next.js).
6. Deploy.

### Option 2: Any Node.js host (self-host)

Use Node.js 20+.

```bash
npm ci
npm run build
npm run start
```

If your host provides a custom port:

```bash
$env:PORT=3000; npm run start
```

Linux/macOS:

```bash
PORT=3000 npm run start
```

## Notes

- Current implementation is UI-only.
- Backend logic (calendar availability, coupon validation, Razorpay integration, and confirmation email flow) is intentionally not implemented yet.
