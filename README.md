# Chat Verse

## Table of Contents

-   [Introdution](#introdution)
-   [Features](#features)
-   [Tech Stack](#tech-stack)
    -   [FrontEnd](#frontend)
    -   [BackEnd](#backend)
    -   [Database](#database)
    -   [Bundler](#bundler)
    -   [Deployment](#deployment)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Visuals](#visuals)
    -   [Register Page](#register-page)
    -   [Login Page](#login-page)
    -   [Chat Page](#chat-page)
    -   [Profile Popup](#profile-popup)
    -   [Search Popup](#search-popup)
    -   [Unread Status and Notification Popup](#unread-status-and-notification-popup)
    -   [Block User](#block-user)
    -   [Google One Tap Sign In](#google-one-tap-sign-in)
    -   [Admin UI](#admin-ui)
-   [Author](#author)
-   [Color Pallete](#color-pallete)

## Introdution

Chat Verse is a real-time chat application where users can chat with other users in real-time. It is developed with Express.js, MongoDB and Socket.io. The application also has multiple user authentication (such as JWT, Google OAuth and Google One Tap SignIn), user search, user profile, user online status, unread message status, and other features. The application also has the admin ui of the socket.io.

The application is developed using the MVC architecture and has a modular codebase. The application is also secured with CSRF, CORS, rate limiting, and other security features.

## Features

-   Real-time chat (with Socket.io)
    1. Send Message
    2. Receive Message
    3. Delete Message (For Both)
    4. Delete Conversation (For Both)
    5. Block & Unblock user
    6. Unread message status
-   Real-time unread message notifications
-   Real-time user online status
-   Real-time other user's changed details reflection
-   User profile (With exciting avatars)
-   User search
-   User authentication
    1. JWT
    2. Google
    3. Google One Tap SignIn
-   CSRF
-   XSS
-   CORS
-   Rate limiting
-   Session Management
-   Cookie Management
-   Cache Control
-   Admin UI (Socket.io)

## Tech Stack

### FrontEnd

-   HTML
-   EJS
-   TailwindCSS
-   JavaScript
-   Socket.io Client

### BackEnd

-   Node.js
-   Express.js
-   Express Session
-   Express Rate Limiting
-   Socket.io
-   PassportJS
-   JWT
-   Google OAuth
-   Google One Tap SignIn
-   CSRF
-   CORS
-   Helmet

### Database

-   MongoDB
-   Mongoose

### Bundler

-   Webpack

### Deployment

-   [Chat Verse](https://chat-verse.glitch.me/chat) deployed on Glitch

## Installation

1. Clone the repository

    ```bash
    git clone https://github.com/Joy9001/Chat-Verse.git
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables

    ```env
    PORT=3000
    SITE_URL=http://localhost:3000
    MONGODB_URI=mongodb://localhost:27017/chat-app (Add a Atlas Cluster URL)
    NODE_ENV=development
    SESSION_SECRET=your_session_secret
    ACCESS_TOKEN_SECRET=your_access_token_secret
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    CRYPTO_SECRET=your_crypto_secret
    ADMIN_EMAIL=your_email
    ADMIN_HASHED_PASSWORD=your_hashed_password
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
    GOOGLE_ONE_TAP_CALLBACK_URL=http://localhost:3000/auth/google/one-tap/callback
    ```

4. Start the server

    ```bash
    npm start
    ```

5. Open the browser and go to `http://localhost:3000`

## Usage

1. Register a new account
2. Login with the registered account
3. Start chatting with other users
4. Search for other users
5. Have fun with amazing avatars

## Visuals

### Register Page

![Register Page](./screenshots/register.png)

### Login Page

![Login Page](./screenshots/login.png)

### Chat Page

![Chat Page](./screenshots/home.png)

### Profile Popup

![Profile Popup](./screenshots/profile.png)

### Search Popup

![Search Popup](./screenshots/search.png)

### Unread Status and Notification Popup

![Unread Status and Notification Popup](./screenshots/unread.png)

### Block User

-   Blocked User

    ![Blocked User](./screenshots/blocked.png)

-   Blocker User

    ![Blocker User](./screenshots/blocker.png)

### Google One Tap Sign In

![Google One Tap Sign In](./screenshots/onetap.png)

### Admin UI

![Admin UI](./screenshots/adminui.png)

## Author

This project is developed by [Joy Mridha](https://github.com/Joy9001).

## Color Pallete

-   ![#765D67](https://via.placeholder.com/15/765D67/000000?text=+) `#765D67`
-   ![#6D3C52](https://via.placeholder.com/15/6D3C52/000000?text=+) `#6D3C52`
-   ![#4B2138](https://via.placeholder.com/15/4B2138/000000?text=+) `#4B2138`
-   ![#1B0C1A](https://via.placeholder.com/15/1B0C1A/000000?text=+) `#1B0C1A`
-   ![#20222F](https://via.placeholder.com/15/20222F/000000?text=+) `#20222F`
-   ![#FADCD5](https://via.placeholder.com/15/FADCD5/000000?text=+) `#FADCD5`
-   ![#E9E9E9](https://via.placeholder.com/15/E9E9E9/000000?text=+) `#E9E9E9`
