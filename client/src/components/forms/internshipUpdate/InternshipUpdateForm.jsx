import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./css/InternshipUpdateForm.css";
import UserContext from "../../../UserContext";
import { useHistory } from "react-router-dom";

function InternshipUpdateForm() {
  const { internshipsList, handleInternshipsList, internship } =
    useContext(UserContext);

    const URL = process.env.REACT_APP_BASE_URL;
  const [companyAdresse, setCompanyAdresse] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [internshipDescription, setInternshipDescription] = useState("");
  const [internshipType, setInternshipType] = useState("");
  const [nbPositions, setNbPositions] = useState("");
  const [internshipSalary, setInternshipSalary] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (internship.companyname === undefined) {
      history.go(-1);
    }
  });

  useEffect(() => {
    try {
      setCompanyAdresse(internship.companyadresse);
      setCompanyName(internship.companyname);
      setContactEmail(internship.contactemail);
      setContactName(internship.contactname);
      setContactPhone(internship.contactphone);
      setInternshipDescription(internship.internshipdescription);
      setInternshipType(internship.internshiptype);
      setNbPositions(internship.nbpositions);
      setInternshipSalary(internship.salary);
    } catch (er) {
      console.error(er);
    }
  }, [
    internship.companyadresse,
    internship.companyname,
    internship.contactemail,
    internship.contactname,
    internship.contactphone,
    internship.internshipdescription,
    internship.internshiptype,
    internship.nbpositions,
    internship.salary,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      contactname: contactName,
      contactemail: contactEmail,
      contactphone: contactPhone,
      companyname: companyName,
      companyadresse: companyAdresse,
      internshiptype: internshipType,
      nbpositions: nbPositions,
      internshipdescription: internshipDescription,
      salary: internshipSalary,
    };
    const internshipId = internship._id;
    axios
      .post(URL + `/api/internship/update-internship`, data, {
        params: { internshipId: internshipId },
      })
      .then((response) => {
        handleInternshipsList([
          ...internshipsList,
          response.data.updatedInternship,
        ]);
        alert("Modification réussi !");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="form-container-update">
      <div className="formbold-main-wrapper-update">
        <div className="formbold-form-wrapper-update">
          <form className="form" onSubmit={handleSubmit}>
            <div className="formbold-form-title">
              <h2 className="">
                Modifier le stage : {internship.internshiptype}
              </h2>
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
            </div>

            <div className="formbold-input-flex">
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
                    placeholder="De 68 393 $ à 139 707 $"
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

            <div>
              <div>
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
            </div>
            <button className="formbold-btn">Ajouter</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InternshipUpdateForm;
