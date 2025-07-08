const express = require('express');
const router = express.Router();
const upload = require('../config/mutler');
const uploadController = require('../controllers/upload.controller');

// Single file: <input name="file" type="file" />
router.post('/single', upload.single('file'), uploadController.uploadSingle);

// Multiple files: <input name="files" type="file" multiple />
router.post('/multiple', upload.array('files', 5), uploadController.uploadMultiple);

module.exports = router;