const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { check } = require('express-validator');
const { runValidation } = require('../middleware/validationMiddleware');

router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  runValidation,
  registerUser
);

router.post(
  '/login',
  [
    check('emailOrUsername', 'Email or username is required').not().isEmpty(),
    check('password', 'Password is required').exists(),
  ],
  runValidation,
  loginUser
);

module.exports = router;
