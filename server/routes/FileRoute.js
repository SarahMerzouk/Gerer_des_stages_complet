const express = require("express");
const router = express.Router();
const filesController = require("../controllers/FileController");
const verifyToken = require('../utils/VerifyToken');
const upload = require('../utils/multer');


router.get("/getFiles",verifyToken, filesController.getFiles);
router.post("/add-student",verifyToken, studentsController.addStudent);
router.post("/delete-all-student",verifyToken, studentsController.deleteAllStudents);
router.delete("/delete-student",verifyToken, studentsController.deleteStudent);
router.post("/upload-csv", verifyToken, upload.single('csv'), studentsController.processCsv);

module.exports = router;