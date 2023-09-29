const express = require("express");
const router = express.Router();
const filesController = require("../controllers/FileController");
const verifyToken = require('../utils/VerifyToken');


router.get("/get-files",verifyToken, filesController.getFiles);
router.post("/add-files",verifyToken, filesController.addFiles);

module.exports = router;