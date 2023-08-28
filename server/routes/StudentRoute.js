const express = require("express");
const router = express.Router();
const studentsController = require("../controllers/StudentController");
const verifyToken = require('../utils/VerifyToken');
const upload = require('../utils/multer');


router.get("/student-list",verifyToken, studentsController.getStudents);
router.post("/add-student",verifyToken, studentsController.addStudent);
router.post("/delete-all-student",verifyToken, studentsController.deleteAllStudents);
router.delete("/delete-student",verifyToken, studentsController.deleteStudent);
router.post("/upload-csv", verifyToken, upload.single('csv'), studentsController.processCsv);

module.exports = router;