const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  picture: { type: String, required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
