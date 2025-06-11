const express = require('express');
const router = express.Router();
const {usersList, singleUser, addUser, deleteUser} = require("../controllers/user.controller")

router.get('/', usersList)
router.get('/:id', singleUser)
router.post('/', addUser)
router.delete('/:id', deleteUser)

module.exports = router;