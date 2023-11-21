const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicantSchema = new Schema({
    internshipId: { type: mongoose.Types.ObjectId, required: true, ref: "InternshipId" },
    studentId: { type: mongoose.Types.ObjectId, required: true, ref: "StudentId" },
})

module.exports = mongoose.model("Applicant", applicantSchema);