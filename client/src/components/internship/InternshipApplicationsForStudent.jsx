import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../UserContext";
import Loading from "../shared/loading/loading";

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
            {stagesInscrits && stagesInscrits.map((stage) => (
                <div>
                    <p>{stage.internshipId.internshiptitle}</p>
                </div>
            ))}
        </div>
    );
}
export default InternshipApplicationsForStudent;
