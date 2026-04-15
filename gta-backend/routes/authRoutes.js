const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/authController');

// Validation rules for registration
const registerValidation = [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters, and include a number').isLength({ min: 6 }).matches(/\d/),
];

router.post('/register', registerValidation, registerUser);
router.post('/login', loginUser);
router.post('/logout', (req, res) => {
    // Client should delete the token on their end.
    // We optionally indicate success.
    res.json({ message: 'User logged out successfully' });
});

module.exports = router;
