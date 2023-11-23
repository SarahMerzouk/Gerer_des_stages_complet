import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../UserContext";
import Loading from "../shared/loading/loading";
import { getDaysSince } from "../../utils/getDaySince";

import CardInternship from "../shared/cards/CardInternshipStudent";
import CardInternshipStudentForApplication from "../shared/cards/CardInternshioStudentForApplication";

function InternshipApplicationsForStudent() {
    const {userId} = useContext(UserContext);
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["x-access-token"] = token;
    const URL = process.env.REACT_APP_BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    // let stagesInscrits = null;
    const [stagesInscrits, setStagesInscrits] = useState([]);

    async function getApplicationsForStudent() {
        try {
            const response = await axios.post(
                URL + "/api/internship/get-Applicant-List-Student",
                {
                    studentId: userId
                }
            );
            //stagesInscrits = response.data.Applicants;
            setStagesInscrits(response.data.Applicants);
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
                    <p>Nombre d'applications: {stagesInscrits.length}</p>
                    <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        className="applicant-table"
                    >

                            <tr>
                                <th>Titre</th>
                                <th>Compagnie</th>
                                <th>Date d'application</th>
                                <th>Personne contact</th>
                                <th>Statue de la demande</th>
                            </tr>

                        {stagesInscrits && stagesInscrits.map((stage) => (
                           <tr>
                                <td>{stage?.internshipId.internshiptitle}</td>
                                <td>{stage?.internshipId.companyname}</td>
                                <td>{getDaysSince(stage.internshipId.creationdate)}</td>
                                <td>{stage?.internshipId.contactemail}</td>
                                <td>{stage?.status}</td>
                           </tr>
                        ))}

                    </table>
                </div>
    
        </div>
    );
}
export default InternshipApplicationsForStudent;
