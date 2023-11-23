import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../UserContext";
import Loading from "../shared/loading/loading";
import CardInternshipStudentApplication from "../shared/cards/CardInternshipStudentApplication";

function InternshipApplicationsForStudent() {
    const {userId} = useContext(UserContext);
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["x-access-token"] = token;
    const URL = process.env.REACT_APP_BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    let stagesInscrits = null;
    async function getApplicationsForStudent() {
        const response = await axios.post(
          URL + "/api/internship/get-Applicant-List-Student",
          {
           studentId: userId
          }
        );
        
        stagesInscrits = response.data.Applicants;
        console.log(stagesInscrits);

        return stagesInscrits;
    }    

    useEffect(() => {
        const fetchData = async () => {
            getApplicationsForStudent();
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
                    <CardInternshipStudentApplication internship={stage.internshipId}/>
                    <p>lol</p>
                </div>
            ))}
        </div>
    );
}
export default InternshipApplicationsForStudent;
