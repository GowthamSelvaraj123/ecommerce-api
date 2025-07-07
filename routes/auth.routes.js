const express = require('express');
const passport = require('passport');
const router = express.Router();
const {register, login, profile, forgotPassword, resetPassword} = require('../controllers/auth.controller');
const authMiddleware = require("../middlewares/auth.middleware");
const { createAccountLimiter } = require("../middlewares/rateLimit.middleware")
router.post('/register', createAccountLimiter, register)
router.post('/login', login)
router.get('/profile', authMiddleware, profile);
router.post('/forgotpassword', createAccountLimiter, forgotPassword);
router.post('/reset-password/:token', resetPassword);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({
      userId: req.user._id,
      email: req.user.email,
      roles: req.user.roles,
    }, JWT_SECRET, { expiresIn: '2h' });

    // Redirect to frontend with token (e.g., via query param or cookie)
    res.redirect(`${process.env.GOOGLE_CALLBACK_URL}/oauth-success?token=${token}`);
  }
);

module.exports = router;