# Fullstack Assignment - Frontend

A modern, responsive frontend application built with Next.js (App Router), React, and Tailwind CSS. It connects to the Express/MongoDB backend to deliver a seamless user experience for authentication and task management.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Library:** React
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Icons:** Lucide React

## Key Features
- **Modern UI:** Built with Tailwind CSS for scalable and responsive design.
- **Authentication Flow:** Integration with the backend for login and registration functionalities.
- **Protected Routes:** Secure dashboard and task management interface using Next.js routing.
- **REST API Integration:** Connects smoothly with the Node/Express backend via Axios.
- **Responsive Layout:** Optimized for both desktop and mobile views.

## Getting Started

### Prerequisites
- Node.js (v18+)
- Backend server running locally (usually on port 5000)

### Installation
1. Navigate to the frontend directory:
   ```bash
   cd assignment-fullstack/frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Ensure that your backend is running, which the frontend will communicate with. Set up your `.env.local` or `.env` if required by your API base URL logic (e.g. `NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1`).

4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Build and Deployment
To build the application for production:
```bash
npm run build
```
To start the production server:
```bash
npm start
```

## Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
