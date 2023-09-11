import React, { useState, useContext } from "react";
import axios from "axios";
import "./css/InternshipForm.css";
import UserContext from "../../../UserContext";
import CustomAlert from "../../shared/customalert/CustomAlert";

function InternshipForm() {
  const { userId, internshipsList, handleInternshipsList } =
    useContext(UserContext);
  const URL = process.env.REACT_APP_BASE_URL;
  const [companyAdresse, setCompanyAdresse] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [internshipDescription, setInternshipDescription] = useState("");
  const [internshipTitle, setInternshipTitle] = useState("");
  const [internshipType, setInternshipType] = useState("");
  const [nbPositions, setNbPositions] = useState("");
  const [internshipSalary, setInternshipSalary] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      contactname: contactName,
      contactemail: contactEmail,
      contactphone: contactPhone,
      companyname: companyName,
      companyadresse: companyAdresse,
      internshiptype: internshipType,
      internshiptitle: internshipTitle,
      nbpositions: nbPositions,
      internshipdescription: internshipDescription,
      salary: internshipSalary,
      ownerid: userId,
    };

    axios
      .post(URL + "/api/internship/add-internship", data)
      .then((response) => {
        setShowForm(false);
        handleInternshipsList([...internshipsList, response.data.internship]);
      })
      .catch((error) => {
        handleShowAlert(true);
        console.error(error);
      });
  };

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="form-container">
      <CustomAlert
        show={showAlert}
        onClose={handleCloseAlert}
        title="Error"
        message="Il y a eu une erreur, contacter sylvain.labranche@cmontmorency.qc.ca"
      />
      <button className="button" onClick={handleButtonClick}>
        {showForm ? "X" : "Ajouter Stage"}
      </button>
      {showForm && (
        <div className="formbold-main-wrapper">
          <>
            {/* Author: FormBold Team */}
            {/* Learn More: https://formbold.com */}
          </>
          <div className="formbold-form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="formbold-form-title">
                <h2 className="">
                  Formulaire d'inscription de milieu de stage
                </h2>
                <p>
                  Stages réguliers ayant lieu à la session hiver Les stages sont
                  du 21 janvier au 3 mai 2019 (il est toutefois possible après
                  entente avec le coordonnateur de débuter le stage un peu plus
                  tôt) Sur réception de ce formulaire, le coordonnateur des
                  stages entrera en contact avec le responsable en entreprise
                  pour discuter du stage. Veuillez vous référez à la page Profil
                  de sortie pour connaître le profil de sortie et les
                  compétences des étudiants.
                </p>
              </div>
              <div className="formbold-mb-3">
                <label className="inputText">
                  Titre du stage :
                  <input
                    type="text"
                    placeholder="2023 Recherche en Apprentissage Automatique"
                    className="formbold-form-input"
                    value={internshipTitle}
                    onChange={(e) => setInternshipTitle(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="formbold-input-flex">
                <div>
                  <label className="inputText">
                    Nom de l'Entreprise :
                    <input
                      type="text"
                      placeholder="Microsoft"
                      className="formbold-form-input"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label className="inputText">
                    Telephone du recruteur :
                    <input
                      type="text"
                      placeholder="123-123-1234"
                      className="formbold-form-input"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="formbold-input-flex">
                <div>
                  <label className="inputText">
                    Adresse de l'Entreprise :
                    <input
                      type="text"
                      placeholder="1234 rue Boby, Montreal"
                      className="formbold-form-input"
                      value={companyAdresse}
                      onChange={(e) => setCompanyAdresse(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label className="inputText">
                    Nom du recruteur :
                    <input
                      type="text"
                      placeholder="Bob smith"
                      className="formbold-form-input"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                    />
                  </label>
                </div>
              </div>
              <div className="formbold-mb-3">
                <label className="inputText">
                  Email du recruteur :
                  <input
                    type="email"
                    placeholder="johnsmith@gmail.com"
                    className="formbold-form-input"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                  />
                </label>
              </div>

              <div className="formbold-mb-3">
                <label className="inputText">
                  Type du Stage :
                  <select
                    className="formbold-form-input"
                    value={internshipType}
                    placeholder="Choisissez une option"
                    onChange={(e) => setInternshipType(e.target.value)}
                    required
                  >
                    <option value="" disabled selected>
                      Choisissez une option
                    </option>
                    <option value="Réseaux et sécurité">
                      Réseaux et sécurité
                    </option>
                    <option value="Développement d'applications">
                      Développement d'applications
                    </option>
                  </select>
                </label>
              </div>

              <div className="formbold-input-flex">
                <div>
                  <label className="inputText">
                    Salaire :
                    <input
                      type="text"
                      placeholder="X$ de l'heure"
                      className="formbold-form-input"
                      value={internshipSalary}
                      onChange={(e) => setInternshipSalary(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label className="inputText">
                    Nombre de poste :
                    <input
                      type="number"
                      placeholder="3"
                      className="formbold-form-input"
                      value={nbPositions}
                      onChange={(e) => setNbPositions(e.target.value)}
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="formbold-mb-3">
                <label className="inputText">
                  Description du Stage :
                  <textarea
                    type="text"
                    placeholder="description"
                    className="formbold-form-textarea"
                    value={internshipDescription}
                    onChange={(e) => setInternshipDescription(e.target.value)}
                    required
                  />
                </label>
              </div>
              <button className="formbold-btn">Ajouter</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default InternshipForm;
