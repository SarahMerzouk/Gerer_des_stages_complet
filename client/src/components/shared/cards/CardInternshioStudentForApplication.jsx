import React, { useState, useContext, useEffect } from "react";
import { getDaysSince } from "../../../utils/getDaySince";
import { NavLink } from "react-router-dom";
import UserContext from "../../../UserContext";
import "./css/CardInternship.css";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useHistory } from "react-router-dom";


function CardInternshipStudentForApplication({ internship }) {
    const URL = process.env.REACT_APP_BASE_URL;
    const { handleInternship, userId } = useContext(UserContext);
    const [isInList, setIsInList] = useState(false);
    const [message, setMessage] = useState("");
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const history = useHistory();
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["x-access-token"] = token;
  
    const handleUpdateInternship = () => {
      handleInternship(internship);
    };
  
    useEffect(() => {
      const internshipId = internship._id;
      axios.post(URL + "/api/internship/is-Applicant-In-List", {
        internshipId: internshipId,
        userId: userId,
      })
        .then((response) => {
          setIsInList(response.data.isInList);
        })
        .catch((error) => {
          console.error(error);
        });
    })
  
    useEffect(() => {
      if (internship.companyname === undefined) {
        history.go(-1);
      }
    });
  
    const handleShowAlert = () => {
      setShowAlert(true);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      try {
  
        handleShowAlert(true);
        setIsSubmitting(false);
        
        await axios.post(URL + "/api/internship/add-Applicant", {
          internshipId: internship._id,
          userId: userId,
        })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error("Error sending email:", error);
        setIsSubmitting(false);
      }
  
      window.location.reload();
    };
  
    return (
      <div className="wrapper">
         <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            className="applicant-table"
        >
        </table>
      </div>
    );
}

export default CardInternshipStudentForApplication;
