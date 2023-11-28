const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicantSchema = new Schema({
    internshipId: { type: mongoose.Types.ObjectId, required: true, ref: "Internship" },
    student: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    status: {
        type: String,
        enum: ["En attente", "En révision", "Acceptée", "Refusée"],
        default: "En attente",
    },
    creationdate: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Applicant", applicantSchema);