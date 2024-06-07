# Blog Backend

This repository contains the backend code for a blog website, including serverless functions for newsletter subscriptions and user reviews.

## Features
- **Blog Management**: Create, read, update, and delete blog posts.
- **Newsletter Subscription**: Users can subscribe to a newsletter.
- **User Reviews**: Users can submit reviews and see all reviews.
- **Serverless Functions**:
  - The POST method for subscribing to the newsletter is deployed on Vercel and can be used in the frontend.
  - The GET and POST methods for user reviews are deployed on Vercel and can be used in the frontend.
- **CORS Handling**: Proper CORS configuration to allow frontend and backend communication.
- **OAuth Login**: Google OAuth login for user authentication.

### Prerequisites
- Node.js
- MongoDB

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/502ermira/blog-backend.git
    ```
2. Navigate to the project directory:
    ```sh
    cd blog-backend
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Create a `.env` file in the root directory with the following content:
    ```
    MONGO_URI=your_mongo_db_connection_string
    PORT=5000
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    OUTLOOK_CLIENT_ID=your_outlook_client_id
    OUTLOOK_CLIENT_SECRET=your_outlook_client_secret
    SESSION_SECRET=your_session_secret_key
    JWT_SECRET=your_jwt_secret_key
    ```
5. Start the application locally:
    ```sh
    node app
    ```

### Note
The newsletter subscription functionality and the user reviews functionality are handled by serverless functions deployed on Vercel. You will need to deploy these functions to Vercel yourself. After deployment, you will get URLs for your serverless functions (`https://your-vercel-deployment-url/api/subscribe` and `https://your-vercel-deployment-url/api/reviews`). Use these URLs in your frontend code to handle newsletter subscriptions and user reviews.
