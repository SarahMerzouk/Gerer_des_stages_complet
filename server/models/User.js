const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
require("dotenv").config();

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  usertype: { type: String, required: true },
  creationdate: { type: Date, default: Date.now},
  verified: {type: Boolean, default: true},
  ApplicantList : [{type: mongoose.Types.ObjectId, ref: "ApplicantId", default: null}],
  datesDeSoumission :[{type: Date, default: null}],
  stagesInscrits :[{type: mongoose.Types.ObjectId, ref: "InternshipId", default: null}],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
