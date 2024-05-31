const mongoose = require('mongoose');
const Review = require('../models/Review');
const authenticateJWT = require('../middleware/authenticateJWT');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected for serverless function'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = async (req, res) => {
  const allowedOrigins = ['http://localhost:5173'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    authenticateJWT(req, res, async () => {
      const { rating, review } = req.body;
      const newReview = new Review({
        user: req.user._id,
        name: req.user.name,  
        email: req.user.email, 
        picture: req.user.picture,
        rating,
        review
      });

      try {
        await newReview.save();
        res.status(201).json(newReview);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });
  } else if (req.method === 'GET') {
    try {
      const reviews = await Review.find().populate('user').exec();
      res.status(200).json(reviews);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
