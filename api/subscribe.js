const mongoose = require('mongoose');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected for serverless function'))
  .catch(err => console.error(err));

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); 
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      const subscriber = new NewsletterSubscriber({ email });
      await subscriber.save();
      res.status(201).json({ message: 'Subscribed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
