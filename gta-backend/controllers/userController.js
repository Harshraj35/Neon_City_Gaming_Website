const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                level: user.level,
                coins: user.coins,
                rank: user.rank,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update user profile & stats
// @route   PUT /api/user/update
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            
            // Allow updating optional game stats if provided
            if (req.body.level !== undefined) user.level = req.body.level;
            if (req.body.coins !== undefined) user.coins = req.body.coins;
            if (req.body.rank !== undefined) user.rank = req.body.rank;

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                level: updatedUser.level,
                coins: updatedUser.coins,
                rank: updatedUser.rank,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Simulate game interaction (earn coins / level up)
// @route   POST /api/user/game-action
// @access  Private
const performGameAction = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            const { actionType } = req.body;
            
            let message = '';
            // Example logic
            if (actionType === 'win_mission') {
                user.coins += 500;
                user.level += 1;
                message = 'Mission passed! Earned 500 coins and 1 level.';
            } else if (actionType === 'robbery') {
                user.coins += 200;
                message = 'Robbery successful! Earned 200 coins.';
            } else {
                return res.status(400).json({ message: 'Invalid action type' });
            }

            // Update rank based on level
            if (user.level >= 50) user.rank = 'Kingpin';
            else if (user.level >= 20) user.rank = 'Boss';
            else if (user.level >= 10) user.rank = 'Hustler';
            else user.rank = 'Beginner';

            await user.save();
            
            res.json({
                message,
                user: {
                    level: user.level,
                    coins: user.coins,
                    rank: user.rank
                }
            });

        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    performGameAction
};
