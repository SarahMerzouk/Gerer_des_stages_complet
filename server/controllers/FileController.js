const fs = require("fs");
const Files = require("../models/Files");
const HttpError = require("../models/HttpError");
const csvParser = require('csv-parser');
const multer = require("multer");


const getFiles = async (req, res, next) => {
    const userId = req.body.userId;
    let files;

    try{
        files = await Files.find( { studentId: userId });
    }
    catch (err) {
        return next(new HttpError("Erreur lors de la recherche des fichiers", 500));
    }

    if (files || files.length > 0) {
        res.json({
            files: files.map((file) =>
                file.toObject({ getters: true })
            ),
        });
    } else {
        return files;
    }
};

const addFiles = async (req, res, next) => {
    const userId = req.body.userId;
    try {
        const { studentId, title, link } = req.body;
        const file = new File({ studentId, title, link });
        await file.save();
        res.status(200).send(`File ${file.title} added successfully`);
      } catch (err) {
        console.error("Error adding file", err);
        res.status(500).send("Error adding file");
      }
};



exports.getFiles = getFiles;
exports.addFiles = addFiles;