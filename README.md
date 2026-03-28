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

- # Fullstack Assignment - Backend

A scalable REST API developed with Node.js, Express, and MongoDB. This backend serves as the foundation for the fullstack assignment, providing robust authentication, role-based access control, and task management capabilities.

## Tech Stack
- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (using Mongoose)
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **API Documentation:** Swagger UI
- **Environment Management:** dotenv

## Key Features
- **User Authentication:** Secure registration and login functionalities using JWT.
- **Role-Based Access Control (RBAC):** Differentiated access between regular users and administrators.
- **Task Management (CRUD):** Create, Read, Update, and Delete operations for Tasks.
- **Centralized Error Handling:** Standardized API error responses and validation.
- **Swagger Documentation:** Auto-generated API specs using Swagger UI.

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas URI)

### Installation
1. Clone the repository (if applicable) and navigate to the backend directory:
   ```bash
   cd assignment-fullstack/backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root backend directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the server (Development mode):
   ```bash
   npm run dev
   ```
5. Start the server (Production mode):
   ```bash
   npm start
   ```

## Documentation
Once the server is running, you can access the Swagger API documentation at:
- `http://localhost:<PORT>/api-docs` (e.g., [http://localhost:5000/api-docs](http://localhost:5000/api-docs))

