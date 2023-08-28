const express = require("express");
const router = express.Router();
const verifyToken = require('../utils/VerifyToken');
const EmailSysController = require('../controllers/EmailSysController')

router.post("/send-message",verifyToken, EmailSysController.upload.array('files'), EmailSysController.sendEmail);

module.exports = router;