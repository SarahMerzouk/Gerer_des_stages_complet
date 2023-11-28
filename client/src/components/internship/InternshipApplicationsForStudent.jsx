import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../UserContext";
import Loading from "../shared/loading/loading";
import { getDaysSince } from "../../utils/getDaySince";
import "./css/internshipPage.css";

function InternshipApplicationsForStudent() {
    const {userId} = useContext(UserContext);
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["x-access-token"] = token;
    const URL = process.env.REACT_APP_BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [stagesInscrits, setStagesInscrits] = useState([]);
    const statusTypes = {
        'En attente': 'enAttente',
        'Acceptée': 'accepte',
        'Refusée' : 'refus',
        'En révision': 'revision',
    };

    async function getApplicationsForStudent() {
        try {
            const response = await axios.post(
                URL + "/api/internship/get-Applicant-List-Student",
                {
                    studentId: userId
                }
            );
            setStagesInscrits(response.data.Applicants);
        } catch (err) {
            console.log(err);
        }
       
    
    }    
    async function deleteApplication(applicationId) {
        try {
            await axios.delete(URL + "/api/internship/delete-applicant", { data: { id: applicationId } });
            await getApplicationsForStudent();
            setStagesInscrits((stagesInscrits) =>
            stagesInscrits .filter((item) => item._id !== applicationId)
      );
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                 await getApplicationsForStudent();
                 console.log(stagesInscrits);
            } catch (err) {
                console.log(err);
            }
           
        };
          fetchData();
    }, [userId]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
                <div>
                    {/*<CardInternshipStudentForApplication internship={stage.internshipId}/>*/}
                    <h2>Liste de toutes les applications envoyées pour les stages</h2>
                    <hr />

                    {stagesInscrits && stagesInscrits.length > 0 && (
                        <div>
                            <h4>Nombre d'applications: {stagesInscrits.length}</h4>
                            <table
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                                className="applicant-table"
                            >
                                    <tr className="applicant-titre-table-row">
                                        <th className="applicant-titre-table-colum">Titre</th>
                                        <th className="applicant-titre-table-colum">Compagnie</th>
                                        <th className="applicant-titre-table-colum">Date d'application</th>
                                        <th className="applicant-titre-table-colum">Personne contact</th>
                                        <th className="applicant-titre-table-colum">Statue de la demande</th>
                                        <th className="applicant-titre-table-colum">Actions</th>
                                    </tr>

                                {stagesInscrits && stagesInscrits.map((stage) => (
                                <tr
                                        key={stage._id}
                                        className="applicant-table-row"
                                    >
                                        <td className="applicant-table-colum">{stage?.internshipId.internshiptitle}</td>
                                        <td className="applicant-table-colum">{stage?.internshipId.companyname}</td>
                                        <td className="applicant-table-colum">{getDaysSince(stage?.creationdate)}</td>
                                        <td className="applicant-table-colum">{stage?.internshipId.contactemail}</td>
                                        <td className={statusTypes[stage?.status]}>{stage?.status}</td>      
                                        <td className="applicant-table-colum">
                                            <button onClick={() => deleteApplication(stage._id)}>Supprimer</button>
                                        </td>                       
                                </tr>
                                ))}
                            </table>
                        </div>
                    )}
                
                    {stagesInscrits.length === 0 && 
                        <p className="noSoumission">Aucune application</p>
                    }
                </div>
    
        </div>
    );
}
export default InternshipApplicationsForStudent;
