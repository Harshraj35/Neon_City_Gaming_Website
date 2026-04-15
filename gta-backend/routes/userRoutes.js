const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, performGameAction } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Group routes by path
router.route('/profile')
    .get(protect, getUserProfile);

router.route('/update')
    .put(protect, updateUserProfile);

// Endpoint to simulate game events (earning coins/levels)
router.route('/game-action')
    .post(protect, performGameAction);

module.exports = router;
