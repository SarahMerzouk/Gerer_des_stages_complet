import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router";
import "./css/internshipPage.css";
import axios from "axios";
import Loading from "../shared/loading/loading";

function InternshipPage() {
  const location = useLocation();
  const internship = location.state;
  const nbCandidatures = internship.applicantlist.length;
  const URL = process.env.REACT_APP_BASE_URL;
  const [studentsList, setStudentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getUser(userId) {
    const response = await axios.get(
      URL + "/api/user/" + userId,
      {
        params: { id: userId },
      }
    );

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

  function bonStage(user) {
    const taille = user.stagesInscrits.length;
    let bonStage = false;
    let date = null;
    let index = null;

    const options = {
      weekday: 'long', // full day name
      year: 'numeric',
      month: 'long', // full month name
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
      timeZone: 'America/Toronto', // Canadian time zone (adjust as needed)
    };

    for (let i = 0; i < taille; i ++) {
      console.log(internship._id);
      if (user.stagesInscrits[i] === internship._id) {
        bonStage = true;
        index = i;
        break;
      }
    }

    if (bonStage) {
      date = user.datesDeSoumission[index];
    }

    const formattedDate = date.toLocaleString('en-CA', options);
    return formattedDate;
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const students = await getStudentsForInternship();

        // vérifier si ma liste à été mise à jour avant de modifier
        // pour éviter une boucle infinie
        // useEffect provoque un nouveau rendu à chaque changement de studentsList, so ça fait une boucle infinie sinon
        if (JSON.stringify(students) !== JSON.stringify(studentsList)) {
          setStudentsList(students);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  
    fetchData();
  }, [studentsList]);

  if (isLoading) {
    return <Loading/>
  }
  return(
        <div>
          <h1>{internship.internshiptitle}</h1>
          <p>{internship.contactname}</p>
          <p>{internship.contactemail}</p>
          <p>{internship.contactphone}</p>

          <h3>Liste d'applicants : </h3>
          {nbCandidatures !== 0 && (
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>Nom de l'étudiant</th>
                  <th>Courriel de l'étudiant</th>
                  <th>Date de soumission de la candidature</th>
                </tr>
              </thead>

              <tbody>
                {studentsList && (
                  <>
                    {studentsList && studentsList.map((student) => (
                      <tr key={student.__id}>
                        {/* si l'étudiant existe */}
                        <td>{student?.user.username || "N/A"}</td>
                        <td>{student?.user.email || "N/A"}</td>
                        <td>{bonStage(student?.user)}</td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>)}

          {nbCandidatures === 0 && (<div>
            <p>Aucune soumission</p>
          </div>)}
        </div>
  );
}
export default InternshipPage;