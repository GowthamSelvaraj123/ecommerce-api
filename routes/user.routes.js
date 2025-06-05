const express = require('express');
const router = express.Router();
const {usersList, singleUser, addUser} = require("../controllers/user.controller")

router.get('/', usersList)
router.get('/:id', singleUser)
router.post('/', addUser)

module.exports = router;