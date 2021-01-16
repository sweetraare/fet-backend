const express = require('express');
const router = express.Router();

const fileController = require('../controllers/file.controller.js');

router.post('/upload', fileController.uploadFile);

module.exports = router;
