const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, getUserStats } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/profile').get(protect, getUserProfile);
router.route('/update').put(protect, updateUserProfile);
router.route('/stats').get(protect, getUserStats);

module.exports = router;
