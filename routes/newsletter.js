const express = require('express');
const router = express.Router();
const { subscribeToNewsletter, getAllSubscribers } = require('../controllers/newsletterController');

router.post('/subscribe', subscribeToNewsletter);
router.get('/subscribers', getAllSubscribers);

module.exports = router;