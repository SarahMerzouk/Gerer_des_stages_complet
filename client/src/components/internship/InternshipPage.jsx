import React from "react";
import { useLocation } from "react-router";
import "./css/internshipPage.css";

function InternshipPage(){
  const location = useLocation();
  const internship = location.state;
  const nbCandidatures = internship.applicantlist.length;

  return(
        <div>
          <h1>{internship.internshiptitle}</h1>
          <p>{internship.internshipdescription}</p>

          {nbCandidatures != 0 && (<div>
            <h3>Liste d'applicants : </h3>
            <table className="table">
              <tr>
                <th>Nom de l'étudiant</th>
                <th>Courriel de l'étudiant</th>
                <th>Date de soumission de la candidature</th>
              </tr>

              <tr>
                <th>test</th>
                <th>test</th>
                <th>test</th>
              </tr>

            </table>
          </div>)}

          {nbCandidatures == 0 && (<div>
            <p>Aucune soumission</p>
          </div>)}
        </div>
  );
}
export default InternshipPage;