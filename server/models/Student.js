const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    DAnumber: {type: String,required: true, unique: true},
    studentName: {type:String,required:true},
    email: {type:String,required:true},
    decType: {type:String,required:true},
})

module.exports = mongoose.model("Student", studentSchema);