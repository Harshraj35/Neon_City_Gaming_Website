const User = require("../models/User");

// @desc    Start a mission
// @route   POST /api/game/start-mission
// @access  Private
const startMission = async (req, res, next) => {
  try {
    const { missionId, rewardCoins, rewardExp } = req.body;
    
    // In a real app, validate missionId and rewards from server side config
    
    // Simulate mission completion
    const user = await User.findById(req.user.id);
    
    if (user) {
      user.coins += rewardCoins || 100;
      user.missionsCompleted += 1;
      
      // Basic leveling logic: Every 5 missions = 1 level
      if (user.missionsCompleted % 5 === 0) {
        user.level += 1;
        // Update rank based on level
        if (user.level >= 50) user.rank = "Cyber Legend";
        else if (user.level >= 30) user.rank = "Elite Hacker";
        else if (user.level >= 10) user.rank = "Street Merc";
      }
      
      const updatedUser = await user.save();
      
      res.json({
        message: "Mission completed successfully!",
        missionId,
        rewards: {
          coins: rewardCoins || 100,
          exp: rewardExp || 50
        },
        userStats: {
          level: updatedUser.level,
          coins: updatedUser.coins,
          missionsCompleted: updatedUser.missionsCompleted,
          rank: updatedUser.rank
        }
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get Game Dashboard
// @route   GET /api/game/dashboard
// @access  Private
const getDashboard = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user) {
      res.json({
        username: user.username,
        level: user.level,
        coins: user.coins,
        missionsCompleted: user.missionsCompleted,
        rank: user.rank,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  startMission,
  getDashboard
};
