import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "./css/internshipPage.css";
import axios from "axios";
import Loading from "../shared/loading/loading";
import { Link } from "react-router-dom";

function InternshipPage() {
  const location = useLocation();
  const internship = location.state;
  const nbCandidatures = internship.applicantlist.length;
  const URL = process.env.REACT_APP_BASE_URL;
  const [applicantList, setApplicantList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getStudentsForInternship() {
    const response = await axios.post(
      URL + "/api/internship/get-Applicant-List-Employeur",
      {
        id: internship._id,
      }
    );
    console.log(response.data.Applicants);
    setApplicantList(response.data.Applicants);
  }

  async function updateApplicantStatus(applicantId, newStatus) {
    try {
      const response = await axios.post(URL + "/api/internship/set-status-Applicant", {
        applicantId: applicantId,
        status: newStatus,
      });
      console.log(applicantId)
      console.log(newStatus)
      // Mettez à jour la liste des candidats après la modification du statut
      // Si nécessaire, manipulez la réponse reçue du backend (response.data) selon vos besoins
      await getStudentsForInternship();
    } catch (err) {
      console.log(err);
    }
  }
  
  function bonStage(user) {
    const taille = user.stagesInscrits.length;
    let bonStage = false;
    let originalDateString = null;
    let originalDate = null;
    let index = null;

    // pour le formatage de mes dates
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
      timeZone: "America/New_York",
    };

    // récupérer l'id du stage inscrit
    for (let i = 0; i < taille; i++) {
      if (user.stagesInscrits[i] === internship._id) {
        bonStage = true;
        index = i;
        break;
      }
    }

    // récupérer la date liée au stage
    if (bonStage) {
      originalDateString = user.datesDeSoumission[index];
    }

    // formater la date pour que ce soit en heure de la zone ou nous sommes
    originalDate = new Date(originalDateString);
    const formattedDate = new Intl.DateTimeFormat("en-CA", options).format(
      originalDate
    );

    return formattedDate;
  }

  useEffect(() => {
    getStudentsForInternship();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="container-connection">
        <div>
          <h1>{internship.internshiptitle}</h1>
          <div>
            <div className="ContactEmp">Contact de l'employeur:</div>
            <span className="card-info-element">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
              </svg>
              {internship.contactname}
            </span>

            <span className="card-info-element">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-envelope-at"
                viewBox="0 0 16 16"
              >
                <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
              </svg>
              {internship.contactemail}
            </span>

            <span className="card-info-element">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-telephone"
                viewBox="0 0 16 16"
              >
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
              </svg>
              {internship.contactphone}
            </span>
          </div>
        </div>
      </div>

      <div className="container-connection ">
        <div className="register-form register-form-applicant">
          <h3>Liste d'applicants : </h3>
          {nbCandidatures !== 0 && (
            <div>
              <table
                cellpadding="0"
                cellspacing="0"
                border="0"
                className="applicant-table"
              >
                {applicantList && (
                  <>
                    <thead>
                      <th>
                        <th>nombre de résultats: {nbCandidatures}</th>
                      </th>
                    </thead>
                    {applicantList &&
                      applicantList.map((applicant) => (
                        <tr
  key={applicant.student.__id}
  className={`applicant-table-row ${applicant.status === 'En attente' ? 'enAttente' : ''} ${applicant.status === 'Acceptée' ? 'accepte' : ''} ${applicant.status === 'Refusée' ? 'refus' : ''} ${applicant.status === 'En révision' ? 'revision' : ''}`}
>
                          {/* si l'étudiant existe */}
                          <td className="applicant-table-colum">
                            {applicant.student?.username || "N/A"}
                          </td>
                          <td className="applicant-table-colum">
                            {applicant.student?.email || "N/A"}
                          </td>
                          <td className="applicant-table-colum">
                            {bonStage(applicant.student)}
                          </td>

                          <td className="applicant-table-colum">
                            {" "}
                            <Link
                              to={{
                                pathname: "/Employeur/candidature/",
                                state: applicant.student,
                              }}
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-info-circle-fill info-icon" viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                          </svg>
                            </Link>
                          </td>
                          <td className={`applicant-table-colum ${applicant.status === 'En attente' ? 'enAttente' : ''} ${applicant.status === 'Acceptée' ? 'accepte' : ''} ${applicant.status === 'Refusée' ? 'refus' : ''} ${applicant.status === 'En révision' ? 'revision' : ''}`}>
                            <select
                              value={applicant.status}
                              onChange={(e) => updateApplicantStatus(applicant._id, e.target.value)}
                            >
                              <option value="En attente">En attente</option>
                              <option value="En révision">En révision</option>
                              <option value="Acceptée">Acceptée</option>
                              <option value="Refusée">Refusée</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                  </>
                )}
              </table>
            </div>
          )}

          <div>
            {nbCandidatures === 0 && (
              <div>
                <p className="noSoumission">Aucune soumission</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default InternshipPage;
