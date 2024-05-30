const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  const token = jwt.sign({ id: req.user._id }, jwtSecret, { expiresIn: '1h' });
  res.redirect(`http://localhost:5173?token=${token}`);
});

router.get('/outlook/callback', passport.authenticate('windowslive', { failureRedirect: '/' }), (req, res) => {
  const token = jwt.sign({ id: req.user._id }, jwtSecret, { expiresIn: '1h' });
  res.redirect(`http://localhost:5173?token=${token}`);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
