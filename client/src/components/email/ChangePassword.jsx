import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./css/ChangePassword.css";
import axios from "axios";
import CustomAlert from "../shared/customalert/CustomAlert"

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const { id, token } = useParams();
  const URL = process.env.REACT_APP_BASE_URL;
  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe sont différent");
      return;
    }
    setError("");
    const data = {
      userId: id,
      validationToken: token,
      newPassword: password,
    };
    await axios.post(URL + "/api/user/changepassword", data).catch((error) => {
      console.error(error);
    });
    handleShowAlert(true);
  };
  return (
    <div className="mainDiv">
      <CustomAlert
        show={showAlert}
        onClose={handleCloseAlert}
        title="Message"
        message="Le mot de passe à été changer"
      />
      <div className="cardStyle">
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="imgDiv">
            <img
              src="https://www.cmontmorency.qc.ca/wp-content/uploads/2018/03/Logomo_1400.png"
              alt="Logo"
              className="imgChange"
            />
          </div>
          <h2 className="formTitle">Changer le mot de passe</h2>

          <div className="inputDiv">
            <label className="inputLabel" for="password">
              Nouveau mot de passe
            </label>
            <input
              className="input-change"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="inputDiv">
            <label className="inputLabel" for="confirmPassword">
              Confirmer le mot de passe
            </label>
            <input
              className="input-change"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="buttonWrapper">
            <button
              type="submit"
              id="submitButton"
              onclick="validateSignupForm()"
              className="submitButton pure-button pure-button-primary"
            >
              <span>Continue</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ChangePassword;
