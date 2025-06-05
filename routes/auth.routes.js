const express = require('express');
const router = express.Router();
const {register, login, profile} = require('../controllers/auth.controller');

router.post('/register', register)
router.post('/login', login)
router.get('/profile', profile)

module.exports = router;