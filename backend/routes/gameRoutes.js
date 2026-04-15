const express = require('express');
const router = express.Router();
const { startMission, getDashboard } = require('../controllers/gameController');
const { protect } = require('../middleware/authMiddleware');

router.route('/start-mission').post(protect, startMission);
router.route('/dashboard').get(protect, getDashboard);

module.exports = router;
