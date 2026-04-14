const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

router.post('/contact', publicController.submitContact);
router.post('/quote', publicController.submitQuote);
router.post('/newsletter', publicController.submitNewsletter);

module.exports = router;
