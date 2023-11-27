const express = require("express");
const InternshipController = require("../controllers/InternshipController");
const router = express.Router();
const verifyToken = require('../utils/VerifyToken');

router.post("/add-internship",verifyToken,InternshipController.addInternship);
router.get("/all-internship",verifyToken,InternshipController.allInternship);
router.get("/get-Internships-By-Owner-Idp",verifyToken,InternshipController.getInternshipsByOwnerId)
router.delete("/delete-internship",verifyToken,InternshipController.deleteInternship);
router.post("/update-internship",verifyToken,InternshipController.updateInternship);
router.post("/add-Applicant",verifyToken, InternshipController.addApplicant);
router.post("/get-Applicant-List-Employeur",InternshipController.getApplicantListEmployeur);
router.post("/get-Applicant-List-Student",InternshipController.getApplicantListStudent);
router.post("/set-status-Applicant",InternshipController.setStatusApplicant);
router.post("/is-Applicant-In-List",verifyToken, InternshipController.isApplicantInList);
router.post("/add-student",verifyToken,InternshipController.addStudent);
router.delete("/delete-applicant",verifyToken,InternshipController.deleteApplicant);

module.exports = router;