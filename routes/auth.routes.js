const express = require('express');
const router = express.Router();
const {register, login, profile, forgotPassword, resetPassword} = require('../controllers/auth.controller');
const authMiddleware = require("../middlewares/auth.middleware");
const { createAccountLimiter } = require("../middlewares/rateLimit.middleware")
router.post('/register', createAccountLimiter, register)
router.post('/login', login)
router.get('/profile', authMiddleware, profile);
router.get('/forgotpassword', forgotPassword);
router.post('/reset-password/:token', resetPassword);


module.exports = router;