import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomAlert from "../shared/customalert/CustomAlert";
import Loading from "../shared/loading/loading";

function EnterEmail() {
  const [userEmail, setUserEmail] = useState("");
  const URL = process.env.REACT_APP_BASE_URL;
  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitting,setIsSubmitting] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSubmit = async (e) => {
    setIsSubmitting(true)
    e.preventDefault();
    try {
      await axios
        .post(URL + "/api/user/sendPswEmail", {
          email: userEmail,
        }).then((res) =>{
          setIsSubmitting(false)
        })
        .catch((error) => {
          console.error(error);
        });
      
      handleShowAlert(true);
      setUserEmail("")
    } catch (err) {
      console.error("send error", err);
    }
  };
  if (isSubmitting) {
    return <Loading/>
  }

  return (
    <div className="mainDiv">
      <CustomAlert
        show={showAlert}
        onClose={handleCloseAlert}
        title="Message"
        message="L'email à bien été envoyé"
      />
      <div className="cardStyle">
        <form onSubmit={handleSubmit}>
          <div className="imgDiv">
            <img
              src="https://www.cmontmorency.qc.ca/wp-content/uploads/2018/03/Logomo_1400.png"
              alt="Logo"
              className="imgChange"
            />
          </div>
          <h2 className="formTitle">Entrer votre email:</h2>
          <div className="inputDiv">
            <input
              type="email"
              placeholder="Email"
              className="formbold-form-input"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>
          <div className="buttonWrapper">
            <button
              className="submitButton pure-button pure-button-primary"
              type="submit"
            >
              Changer !
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EnterEmail;
