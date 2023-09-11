const fs = require("fs");
const Student = require("../models/Student"); // assuming the schema is in a file called "student.js"
const HttpError = require("../models/HttpError");
const csvParser = require('csv-parser');
const multer = require("multer");

const processCsv = async (req, res) => {
  const csvParserOptions = {
    headers: ["DAnumber", "studentName", "email", "decType"],
    skipLines: 1, // Skip the header line in the CSV file
  };

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const students = [];
    const bufferStream = new require('stream').Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null);

    bufferStream
      .pipe(csvParser(csvParserOptions))
      .on('data', (row) => {
        students.push({
          DAnumber: row.DAnumber,
          studentName: row.studentName,
          email: row.email,
          decType: row.decType,
        });
      })
      .on('end', async () => {
        // Filter out students with existing IDs
        const uniqueStudents = [];
        for (const student of students) {
          const existingStudent = await Student.findOne({ DAnumber: student.DAnumber });
          if (!existingStudent) {
            uniqueStudents.push(student);
          }
        }

        await Student.insertMany(uniqueStudents);
        res.status(201).json({ message: 'Students added successfully' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while processing the file' });
  }
};

const getStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    console.error("Error getting students", err);
    res.status(500).send("Error getting students");
  }
};

const addStudent = async (req, res, next) => {
  try {
    const { DAnumber, studentName, email, decType } = req.body;
    const student = new Student({ DAnumber, studentName, email, decType });
    await student.save();
    res.status(200).send(`Student ${student.studentName} added successfully`);
  } catch (err) {
    console.error("Error adding student", err);
    res.status(500).send("Error adding student");
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    await Student.findByIdAndDelete(userId);
    res.status(200).send(`Student deleted successfully`);
  } catch (err) {
    console.error("Error deleting student", err);
    res.status(err.code || 500).send(err.message || "Error deleting student");
  }
};

const deleteAllStudents = async (req, res, next) => {
  try {
    await Student.deleteMany();
    res.status(200).send("All students deleted successfully");
  } catch (err) {
    console.error("Error deleting all students", err);
    res.status(500).send("Error deleting all students");
  }
};

exports.processCsv = processCsv;
exports.getStudents = getStudents;
exports.addStudent = addStudent;
exports.deleteStudent = deleteStudent;
exports.deleteAllStudents = deleteAllStudents;