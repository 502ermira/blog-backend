const express = require('express');
const Review = require('../models/Review');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticateJWT');

router.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

router.post('/', authenticateJWT, async (req, res) => {
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
});

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('user').exec();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
