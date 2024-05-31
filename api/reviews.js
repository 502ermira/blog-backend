const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Review = require('../models/Review');
const authenticateJWT = require('../middleware/authenticateJWT');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/reviews', authenticateJWT, async (req, res) => {
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

const postReview = async (req, res) => {
    console.log('User in request:', req.user);
  
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
  };
  

app.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().populate('user').exec();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const getReviews = async (req, res) => {
    try {
      const reviews = await Review.find().populate('user').exec();
      res.json(reviews);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  module.exports = {
    getReviews,
    postReview
  };
  module.exports = router;
