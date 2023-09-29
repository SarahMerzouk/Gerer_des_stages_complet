const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    studentId: { type: mongoose.Types.ObjectId, required: true, ref: "StudentId" },
    title: {type: String, required: true},
    link: { type:String, required:true }
})

module.exports = mongoose.model("File", fileSchema);