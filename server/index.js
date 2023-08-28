const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const URL = process.env.HOSTCONNECTION + "internships";
const HttpErreur = require("./models/HttpErreur");
const UserRoute = require("./routes/UserRoute");
const InternshipRoute = require("./routes/InternshipRoute");
const EmailSysController = require("./routes/EmailSysRoute");
const StudentRoute = require("./routes/StudentRoute");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/email", EmailSysController);
app.use("/api/user", UserRoute);
app.use("/api/internship", InternshipRoute);
app.use("/api/student", StudentRoute);
app.use((requete, reponse, next) => {
  return next(new HttpErreur("Route non trouvée", 404 ));
});

app.use((error, requete, reponse, next) => {
  if (reponse.headerSent) {
    return next(error);
  }
  reponse.status(error.code || 500);
  reponse.json({
    message: error.message || "Une erreur inconnue est survenue",
  });
});

mongoose.set("strictQuery", true);

mongoose
  .connect(URL)
  .then(() => {
    app.listen(5000);
    console.log("Connexion à la base de données réussie");
  })
  .catch((erreur) => {
    console.log(erreur);
  });

app.listen(PORT, () => {
  console.log("Server is running");
});
