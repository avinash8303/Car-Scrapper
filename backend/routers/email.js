const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');
const { authenticate } = require('../middleWares/auth');
const Email = require('../models/emailModel'); // adjust path as needed

// Send email route - protected by authenticate middleware
router.post('/send', authenticate, emailController.sendEmail);

router.post('/', async (req, res) => {
    try {
        const email = new Email(req.body);
        await email.save();
        res.status(200).json({ message: 'Email saved!' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save email' });
    }
});

module.exports = router;