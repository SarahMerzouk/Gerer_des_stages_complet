const Token = require("../models/Token");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Internship = require("../models/Internship");
require("dotenv").config();
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const HttpError = require("../models/HttpError");

const register = async (req, res) => {
  const { email, username, password, usertype } = req.body;
  const existingUser = await User.findOne({ email: email });
  if (existingUser != null) {
    return res.status(400).send("L'utilisateur existe déjà.");
  }
  const user = new User({
    email: email,
    username: username,
    password: password,
    usertype: usertype,
  });
  await user.save();

  const token = await new Token({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  }).save();

  const jwT = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  const url = `${process.env.BASE_URL}/users/${user.id}/verify/${token.token}`;
  await sendEmail(user.email, "Verify Email", url);

  res.status(201).send({ jwT });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send("Identifiants invalides.");
    }
    const userType = await user.usertype;
    const token = jwt.sign(
      { _id: user._id, usertype: user.usertype },
      process.env.JWT_SECRET
    );
    const userid = user._id;
    if (!user.verified) {
      return res.status(403).send("Compte n'est pas vérifier");
    }
    res.send({ token, userType, userid });
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
};

const allUsers = async (requete, reponse, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return next(
      new HttpError(
        "Erreur lors de la récupération de la liste des profs",
        500
      )
    );
  }
  if (!users) {
    return next(new HttpError("Aucun prof trouvé", 404));
  }
  reponse.json({
    users: users.map((user) => user.toObject({ getters: true })),
  });
};

const updateUserRole = async (request, response, next) => {
  const { userId, password, usertype, userIdtoChange } = request.body;
  let user;
  try {
    user = await User.findById(userId);
    userToChange = await User.findById(userIdtoChange);
  } catch (err) {
    return next(
      new HttpError("Erreur lors de la récupération de l'utilisateur", 500)
    );
  }

  if (!user) {
    return next(new HttpError("Utilisateur non trouvé", 404));
  }
  console.log(await user.comparePassword(password))
  console.log(user)
  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    return next(new HttpError("Mot de passe invalide", 401));
  }

  userToChange.usertype = usertype;
  try {
    await user.save();
  } catch (err) {
    return next(
      new HttpError("Erreur lors de la mise à jour de l'utilisateur", 500)
    );
  }

  response
    .status(200)
    .json({ message: "Rôle utilisateur mis à jour avec succès" });
};

const deleteUser = async (request, response, next) => {
  try {
    const userId = request.body.userId;
    await Internship.deleteMany({ ownerid: userId });

    await User.findByIdAndDelete(userId);

    response.status(204).end();
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
};
const sendEmailPassword = async (req, res) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({email: email});
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.BASE_URL}/users/${user._id}/changepassword/${token.token}`;
    await sendEmail(user.email, "Change password", url);
    res.status(204).end();
  } catch (err) {
    console.error("send email error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updatePassword = async (req, res) => {
  try{
    const { userId , validationToken, newPassword } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({ token: validationToken });
    console.error(validationToken)
    if (!token) return res.status(400).send({ message: "Invalid Token" });

    user.password = newPassword;

    await user.save();
    res.status(200).send({ message: "Password change !" });
  } catch (err) {
    console.error("change password error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({ userId: user._id });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    user.verified = true;
    await user.save();
    await Token.findByIdAndDelete(token._id);

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.register = register;
exports.login = login;
exports.allUsers = allUsers;
exports.updateUserRole = updateUserRole;
exports.deleteUser = deleteUser;
exports.verifyUser = verifyUser;
exports.sendEmailPassword = sendEmailPassword;
exports.updatePassword = updatePassword;