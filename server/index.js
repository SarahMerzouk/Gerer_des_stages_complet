const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const URL = process.env.HOSTCONNECTION + "internships";
const HttpError = require("./models/HttpError");
const UserRoute = require("./routes/UserRoute");
const FileRoute = require("./routes/FileRoute");
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
app.use("/api/file", FileRoute);
app.use((requete, reponse, next) => {
  return next(new HttpError("Route non trouvée", 404 ));
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
    console.error("Connexion à la base de données réussie");
  })
  .catch((erreur) => {
    console.error(erreur);
  });

app.listen(PORT, () => {
  console.error("Server is running" + " - " + PORT);
});
