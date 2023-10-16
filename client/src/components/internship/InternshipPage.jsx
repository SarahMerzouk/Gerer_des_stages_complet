import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router";
import "./css/internshipPage.css";
import axios from "axios";

function InternshipPage() {
  const location = useLocation();
  const internship = location.state;
  const nbCandidatures = internship.applicantlist.length;
  const URL = process.env.REACT_APP_BASE_URL;

  async function getUser(userId) {
    const response = await axios.get(
      URL + "/api/user/" + userId,
      {
        params: { id: userId },
      }
    );
    
    console.log("response: ", response.data);
    return response.data;
  }

  async function getStudentsForInternship(){
    let arrayOfStudents = [];

    for (let i = 0; i < nbCandidatures; i++) {
      const userId = internship.applicantlist[i];
  
      try {
        const student = await getUser(userId);
        arrayOfStudents.push(student);
      } catch (error) {
        console.error(error);
      }
    }

    return arrayOfStudents;
  }

  async function fetchData() {
    const students = await getStudentsForInternship();
    console.log(students);
  }

  console.log(getStudentsForInternship());

  return(
        <div>
          <h1>{internship.internshiptitle}</h1>
          <p>{internship.contactname}</p>
          <p>{internship.contactemail}</p>
          <p>{internship.contactphone}</p>

          <h3>Liste d'applicants : </h3>
          {nbCandidatures !== 0 && (<div>
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