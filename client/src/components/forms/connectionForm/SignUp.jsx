import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomAlert from "../../shared/customalert/CustomAlert";

function SignUp() {
  const [email, setSignUpEmail] = useState("");
  const [username, setSignUpUserName] = useState("");
  const [password, setSignUpPassword] = useState("");
  const [usertype, setUserType] = useState("Etudiant");
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    setError("");
  }, [email, password]);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        URL + "/api/user/register",
        {
          email,
          username,
          password,
          usertype,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //setError(null);
      setShowAlert(true);
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };

  return (
    <div className="signup">
      <CustomAlert
        show={showAlert}
        onClose={handleCloseAlert}
        htmlFor="chk"
        title="Message"
        message="Le compte a bien été créer"
      />
      <form onSubmit={handleSubmit}>
        <label className="title-label" htmlFor="chk" aria-hidden="true">
          S'inscrire
        </label>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          name="usernameSignup"
          placeholder="Identifiant"
          required=""
          value={username}
          onChange={(e) => setSignUpUserName(e.target.value)}
          className="inputlog"
        />
        <input
          type="email"
          name="emailSignup"
          placeholder="Email"
          required=""
          value={email}
          onChange={(e) => setSignUpEmail(e.target.value)}
          autoComplete="new-email"
          className="inputlog"
        />
        <input
          type="password"
          name="pswd"
          placeholder="Password"
          required=""
          value={password}
          onChange={(e) => setSignUpPassword(e.target.value)}
          autoComplete="new-password"
          className="inputlog"
        />
        <div className="SignUp__wrapper">
          <label className="radio-label">
            <input
              id="one"
              type="radio"
              name="userType"
              value="Etudiant"
              checked={usertype === "Etudiant"}
              onChange={(e) => setUserType(e.target.value)}
              className="inputlab"
            />
            <span>Étudiant</span>
            <div className="check"></div>
          </label>

          <label className="radio-label">
            <input
              id="two"
              type="radio"
              name="userType"
              value="Employeur"
              checked={usertype === "Employeur"}
              onChange={(e) => setUserType(e.target.value)}
            />
            <span>Employeur</span>
            <div className="check">
              <div className="inside"></div>
            </div>
          </label>
        </div>
        <button>Valider</button>
      </form>
    </div>
  );
}

export default SignUp;
