const express = require("express");
const router = express.Router();
const filesController = require("../controllers/FileController");
const verifyToken = require('../utils/VerifyToken');
const upload = require('../utils/multer');


router.get("/get-files",verifyToken, filesController.getFiles);
router.post("/add-file",verifyToken, filesController.addFiles);

module.exports = router;