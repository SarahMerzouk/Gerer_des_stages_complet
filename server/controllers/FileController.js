const fs = require("fs");
const Student = require("../models/Student");
const HttpError = require("../models/HttpError");
const csvParser = require('csv-parser');
const multer = require("multer");


const getFiles = async (req, res, next) => {
    const userId = req.body.userId;
    
};


/*exports.processCsv = processCsv;
exports.getStudents = getStudents;
exports.addStudent = addStudent;
exports.deleteStudent = deleteStudent;
exports.deleteAllStudents = deleteAllStudents;*/