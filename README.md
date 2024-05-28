# Blog Backend
This repository contains the backend code for a blog website, including a serverless function for newsletter subscriptions.

## Features
- **Blog Management**: Create, read, update, and delete blog posts.
- **Newsletter Subscription**: Users can subscribe to a newsletter.
- **Serverless Function**: The POST method for subscribing to the newsletter is deployed on Vercel and can be used in the frontend.
- **CORS Handling**: Proper CORS configuration to allow frontend and backend communication.

### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repository:
git clone https://github.com/502ermira/blog-backend.git
2. Navigate to the project directory:
cd blog-backend
3. Install dependencies:
npm install
4. Create a `.env` file in the root directory with the following content:
`MONGO_URI=your_mongo_db_connection_string
PORT=5000`
5. Start the application locally: node app

`Note`: The newsletter subscription functionality is handled by a serverless function deployed on Vercel. You will need to deploy this function to Vercel yourself.  After deployment, you will get a URL for your serverless function (`https://your-vercel-deployment-url/api/subscribe`). Use this URL in your frontend code to handle newsletter subscriptions.
