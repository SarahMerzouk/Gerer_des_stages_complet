const Internship = require("../models/Internship");
const HttpError = require("../models/HttpErreur");

const addInternship = async (req, res) => {
  try {
    const newInternship = new Internship({
      contactname: req.body.contactname,
      contactemail: req.body.contactemail,
      contactphone: req.body.contactphone,
      companyname: req.body.companyname,
      companyadresse: req.body.companyadresse,
      internshiptype: req.body.internshiptype,
      internshiptitle: req.body.internshiptitle,
      nbpositions: req.body.nbpositions,
      internshipdescription: req.body.internshipdescription,
      salary: req.body.salary,
      ownerid: req.body.ownerid,
      applicantlist: [],
    });

    const internship = await newInternship.save();

    res
      .status(201)
      .json({ message: "Internship added successfully", internship });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const allInternship = async (requete, reponse, next) => {
  let internships;
  try {
    internships = await Internship.find();
  } catch (err) {
    return next(
      new HttpErreur(
        "Erreur lors de la récupération de la liste des profs",
        500
      )
    );
  }
  if (!internships) {
    return next(new HttpErreur("Aucun prof trouvé", 404));
  }
  reponse.json({
    internships: internships.map((internship) => internship.toObject({ getters: true })),
  });
};

const getInternshipsByOwnerId = async (req, res, next) => {
  const ownerid = req.query.ownerid;
  let internships;
  try {
    internships = await Internship.find({ ownerid: ownerid });
  } catch (err) {
    return next(
      new HttpError("Erreur lors de la récupération de la liste des stages", 500)
    );
  }

  if (!internships || internships.length === 0) {
    return next(new HttpError("Aucun stage trouvé", 404));
  }
  res.json({
    internships: internships.map((internship) => internship.toObject({ getters: true })),
  });
};

const deleteInternship = async (req, res, next) => {
  const internshipId = req.body.internshipId;
  let internship;
  try {
    internship = await Internship.findByIdAndRemove(internshipId);
  } catch (err) {
    return next(
      new HttpError("Erreur lors de la suppression du stage", 500)
    );
  }

  if (!internship) {
    return next(new HttpError("Aucun stage trouvé avec cet identifiant", 404));
  }
  res.status(200).json({ message: 'Stage supprimé avec succès' });
};

const updateInternship = async (req, res, next) => {
  const internshipId = req.query.internshipId;

  const {
    contactname,
    contactemail,
    contactphone,
    companyname,
    companyadresse,
    internshiptype,
    internshiptitle,
    nbpositions,
    internshipdescription,
    salary
  } = req.body;

  let internship;
  try {
    internship = await Internship.findById(internshipId);
  } catch (err) {
    return next(
      new HttpError("Erreur lors de la recherche du stage", 500)
    );
  }

  if (!internship) {
    return next(new HttpError("Aucun stage trouvé avec cet identifiant", 404));
  }

  internship.contactname = contactname || internship.contactname;
  internship.contactemail = contactemail || internship.contactemail;
  internship.contactphone = contactphone || internship.contactphone;
  internship.companyname = companyname || internship.companyname;
  internship.companyadresse = companyadresse || internship.companyadresse;
  internship.internshiptype = internshiptype || internship.internshiptype;
  internship.internshiptitle = internshiptitle || internship.internshiptitle;
  internship.nbpositions = nbpositions || internship.nbpositions;
  internship.internshipdescription = internshipdescription || internship.internshipdescription;
  internship.salary = salary || internship.salary;

  try {
    await internship.save();
  } catch (err) {
    return next(
      new HttpError("Erreur lors de la mise à jour du stage", 500)
    );
  }

  res.status(200).json({ message: 'Stage mis à jour avec succès', updatedInternship: internship.toObject({ getters: true }) });
};

const addApplicant = async (req, res, next) => {
  const internshipId = req.body.internshipId;
  const userId = req.body.userId;

  try {
    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return next(new HttpError("Internship not found", 404));
    }

    if (!internship.applicantlist.includes(userId)) {
      internship.applicantlist.push(userId);
      await internship.save();
      res.status(200).json({ message: "User added to the application list successfully" });
    } else {
      return next(new HttpError("User already in application list", 400));
    }
  } catch (error) {
    console.error(error);
    return next(new HttpError("Internal server error", 500));
  }
};

const isApplicantInList = async (req, res, next) => {
  const internshipId = req.body.internshipId;
  const userId = req.body.userId;
  try {
    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return next(new HttpError("Internship not found", 404));
    }

    const isInList = internship.applicantlist.includes(userId);
    res.status(200).json({ isInList });
  } catch (error) {
    console.error(error);
    return next(new HttpError("Internal server error", 500));
  }
};

exports.addInternship = addInternship;
exports.allInternship = allInternship;
exports.getInternshipsByOwnerId = getInternshipsByOwnerId;
exports.deleteInternship = deleteInternship;
exports.updateInternship = updateInternship;
exports.addApplicant = addApplicant;
exports.isApplicantInList = isApplicantInList;
