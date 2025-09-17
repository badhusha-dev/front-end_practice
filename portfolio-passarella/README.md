# Portfolio Passerella (React + Vite + Three.js)

Modern portfolio with an Infinite Passerella Three.js hero, Bootstrap UI, Framer Motion animations, and a working SMTP contact backend.

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Backend (Express + Nodemailer)

Create a `.env` file with:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your_app_password
RECEIVER_EMAIL=officialbadhusha@gmail.com
PORT=5000
```

Run backend:

```bash
cd server && npm i && node index.js
```

## Docker

```bash
docker-compose up --build
```

This builds the frontend (nginx on 3000) and runs the backend on 5000.

## Notes
- Three.js Infinite Passerella is implemented in `src/three/ThreeScene.jsx`.
- Contact page posts to `/api/contact` (configure reverse-proxy in production).


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
