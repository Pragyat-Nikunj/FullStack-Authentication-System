# Full Stack Authentication System

A robust, full-stack authentication system built with Next.js, React, Node.js, and MongoDB. This project provides a secure and user-friendly authentication flow, including user registration, login, email verification, password reset, and protected routes.

## 🚀 Live Demo

[Access the Live Application](https://full-stack-authentication-system-liard.vercel.app/login)

## Features

- User registration with email verification
- Secure login with hashed passwords
- Forgot password and password reset via email
- Protected user profile route
- Responsive and modern UI with Tailwind CSS
- Toast notifications for user feedback

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend:** Node.js, Express.js (API routes)
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT, bcryptjs
- **Email:** Nodemailer (Mailtrap for development)

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Pragyat-Nikunj/FullStack-Authentication-System.git
   cd FullStack-Authentication-System
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**

   Create a `.env.local` file in the root directory and add the following:

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   MAILTRAP_USER=your_mailtrap_user
   MAILTRAP_PASS=your_mailtrap_pass
   DOMAIN=http://localhost:3000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000/login](http://localhost:3000/login) in your browser.**

## Folder Structure

```
src/
  app/                # Next.js pages and routes
  models/             # Mongoose models
  helpers/            # Utility functions (mailer, etc.)
  ...
```



## License

This project is licensed under the MIT License.

---

**Made with ❤️ by Pragyat Nikunj**
