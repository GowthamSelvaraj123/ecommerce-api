const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Get Users Successfully");
})
router.get('/:id', (req, res) => {
    res.send("Get single user");
})
router.post('/', (req, res) => {
    res.send("Post User Successfully");
})

module.exports = router;