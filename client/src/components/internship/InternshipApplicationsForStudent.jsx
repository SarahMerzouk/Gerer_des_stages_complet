import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import CardInternshipStudent from "../shared/cards/CardInternshipStudent";
import UserContext from "../../UserContext";
import "./css/InternshipListStudent.css";
import Loading from "../shared/loading/loading";

function InternshipApplicationsForStudent() {
    const { userId} = useContext(UserContext);
    const [applicationsList, setApplicationsList] = useState([]);
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["x-access-token"] = token;
    const URL = process.env.REACT_APP_BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    
    async function getApplicationsForStudent() {
        const response = await axios.get(
          URL + "/api/internship/get-Applicant-List-Student",
          {
            studentId: userId,
          }
        );
        console.log(response.data.Applicants);
        setApplicationsList(response.data);
      }

      useEffect(() => {
        getApplicationsForStudent();
        console.log('lol', applicationsList);
      }, []);
    
      if (isLoading) {
        return <Loading />;
      }

    return (
        <div>hello</div>
    );
}
export default InternshipApplicationsForStudent;
