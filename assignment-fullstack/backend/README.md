# Fullstack Assignment - Backend

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
