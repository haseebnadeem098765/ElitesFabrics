const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const contentController = require('../controllers/contentController');

router.get('/', contentController.getContent);
router.post('/', auth, contentController.updateContent);

module.exports = router;
