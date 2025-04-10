Social Media App - Full Stack
This is a full-stack social media application built using React (Vite) for the frontend and Node.js with GraphQL and Prisma ORM for the backend. The app allows users to register, log in, create posts, like posts, follow/unfollow users, and comment on posts. The backend uses PostgreSQL as the database.

Table of Contents
Overview

Technologies

Features

Frontend Setup

Backend Setup

Installation

Usage

API Documentation

Contributors

License

Overview
This is a Social Media Feed application where users can:

Register and Log In using JWT tokens.

Create Posts, Like Posts, Comment on Posts.

Follow/Unfollow other users.

The application has been built to use the following technologies:

Frontend: React, Vite, TypeScript, Tailwind CSS

Backend: Node.js, Express, GraphQL, Prisma ORM, PostgreSQL

Technologies
Frontend:
React (Vite): For building dynamic and responsive user interfaces.

TypeScript: To provide type safety for the React components.

Tailwind CSS: For utility-first modern CSS styling.

Backend:
Node.js & Express: Server-side logic and handling HTTP requests.

GraphQL: API to efficiently handle data fetching and mutations.

Prisma ORM: A powerful tool for database management and querying.

PostgreSQL: Relational database to store user data, posts, likes, and followers.

Other Dependencies:
bcryptjs: For hashing passwords.

jsonwebtoken: For creating and verifying JWT tokens.

Features
Authentication: Register and login users using JWT tokens.

User Profiles: Users can create and manage their profiles.

Posts: Users can create, edit, and delete posts.

Likes: Users can like and unlike posts.

Comments: Users can comment on posts.

Follow System: Users can follow/unfollow other users.

Frontend Setup
Requirements:
Node.js (v14 or higher)

npm (v7 or higher)

Steps to Set Up the Frontend:
Clone the repository and navigate to the frontend directory:

bash
Copy
Edit
git clone https://github.com/your-username/social-media-app.git
cd social-media-app/frontend
Install frontend dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm run dev
The frontend will be available at http://localhost:3000.

Create a .env file in the frontend directory and add the backend URL for the API:

bash
Copy
Edit
REACT_APP_API_URL=http://localhost:4000/graphql
Open your browser and visit http://localhost:3000 to interact with the app.

Features in the Frontend:
A login and registration page.

A homepage to view posts, like, comment, and create posts.

A follow/unfollow system for users.

Backend Setup
Requirements:
Node.js (v14 or higher)

npm (v7 or higher)

PostgreSQL: Make sure you have PostgreSQL running locally or on a cloud service.

Steps to Set Up the Backend:
Clone the repository and navigate to the backend directory:

bash
Copy
Edit
git clone https://github.com/your-username/social-media-app.git
cd social-media-app/backend
Install backend dependencies:

bash
Copy
Edit
npm install
Create a .env file in the backend directory and set up the DATABASE_URL:

ini
Copy
Edit
DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb?schema=public"
Run Prisma migrations to set up the database schema:

bash
Copy
Edit
npx prisma migrate dev
Generate the Prisma Client:

bash
Copy
Edit
npx prisma generate
Start the backend server:

bash
Copy
Edit
npm run dev
The backend will be available at http://localhost:4000.

Features in the Backend:
GraphQL API to manage posts, users, likes, comments, and follows.

JWT Authentication for secure login and registration.

CRUD operations for posts, likes, comments, and users.

Installation
Full Setup for Both Frontend and Backend:
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/social-media-app.git
Install dependencies for the frontend:

bash
Copy
Edit
cd social-media-app/frontend
npm install
Install dependencies for the backend:

bash
Copy
Edit
cd ../backend
npm install
Set up the PostgreSQL database locally or using a cloud provider (e.g., Heroku).

Configure your .env files for both frontend and backend:

Frontend: Set REACT_APP_API_URL to your backend URL (e.g., http://localhost:4000/graphql).

Backend: Set DATABASE_URL to your PostgreSQL connection string.

Run the backend:

bash
Copy
Edit
cd social-media-app/backend
npm run dev
Run the frontend:

bash
Copy
Edit
cd ../frontend
npm run dev
The frontend should be accessible at http://localhost:3000 and the backend at http://localhost:4000.

API Documentation
GraphQL API Endpoints
Register a new user:

graphql
Copy
Edit
mutation {
  registerUser(input: { username: "username", password: "password" }) {
    user {
      id
      username
    }
    token
  }
}
Login:

graphql
Copy
Edit
mutation {
  loginUser(input: { username: "username", password: "password" }) {
    token
  }
}
Create Post:

graphql
Copy
Edit
mutation {
  createPost(input: { content: "This is a new post" }) {
    post {
      id
      content
    }
  }
}
Like Post:

graphql
Copy
Edit
mutation {
  likePost(postId: 1) {
    post {
      id
      likesCount
    }
  }
}
Follow User:

graphql
Copy
Edit
mutation {
  followUser(followeeId: 2) {
    user {
      id
      username
    }
  }
}
Contributors
nkatha1

License
This project is licensed under the MIT License - see the LICENSE file for details.

