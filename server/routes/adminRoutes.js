const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminController = require('../controllers/adminController');

// Auth Routes
router.post('/setup', adminController.setupAdmin);
router.post('/login', adminController.loginAdmin);

// Form Management Routes
router.get('/contacts', auth, adminController.getContacts);
router.delete('/contacts/:id', auth, adminController.deleteContact);
router.get('/quotes', auth, adminController.getQuotes);
router.delete('/quotes/:id', auth, adminController.deleteQuote);
router.get('/newsletters', auth, adminController.getNewsletters);

module.exports = router;
