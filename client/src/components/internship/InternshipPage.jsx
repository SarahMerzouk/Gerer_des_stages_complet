import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router";
import "./css/internshipPage.css";
import axios from "axios";

function InternshipPage() {
  const location = useLocation();
  const internship = location.state;
  const nbCandidatures = internship.applicantlist.length;

  async function getUser(userId) {
    const response = await axios.get(
      URL + "api/user/",
      {
        params: { id: userId },
      }
    );

    return response.data;
  }

  function getStudentsForInternship(){
    let arrayOfStudents = [];
    let student;

    for (let i = 0; i < nbCandidatures; i++) {
      try {
        student = getUser(internship.applicantlist[i]);
        console.log("test", student);
        arrayOfStudents.push(student);
      } catch (error) {
          console.error(error);
      }
      return arrayOfStudents;
    }
  }
  getStudentsForInternship();

  return(
        <div>
          <h1>{internship.internshiptitle}</h1>
          <p>{internship.contactname}</p>
          <p>{internship.contactemail}</p>
          <p>{internship.contactphone}</p>

          {nbCandidatures !== 0 && (<div>
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

          {nbCandidatures === 0 && (<div>
            <p>Aucune soumission</p>
          </div>)}
        </div>
  );
}
export default InternshipPage;