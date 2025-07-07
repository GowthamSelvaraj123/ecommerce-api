const express = require('express');
const router = express.Router();
const {usersList, singleUser, addUser, deleteUser} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRoles = require('../middlewares/role.middleware');

router.get('/', authMiddleware, authorizeRoles('admin'), usersList)
router.get('/:id', authMiddleware, authorizeRoles('admin'), singleUser)
router.post('/', authMiddleware, authorizeRoles('admin'), addUser)
router.delete('/:id', authMiddleware, deleteUser)

module.exports = router;