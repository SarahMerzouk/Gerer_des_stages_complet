import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../../UserContext.jsx";
import SectionFichiers from "../userFiles/SectionFichiers.jsx";
import axios from "axios";
import "./css/Profil.css";

function Profil() {
  const { userId, role } = useContext(UserContext);
  const [userEmail, setUserEmail] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [oldName, setOldName] = useState("");
  const [oldEmail, setOldEmail] = useState("");
  const URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    getUserInfo(userId);
  }, [userId]);

  useEffect(() => {
    setUserEmail(updatedEmail);
  }, [updatedEmail]);

  const getUserInfo = async (userId) => {
    try {
      const response = await axios.get(URL + `/api/user/${userId}`);
      const userData = response.data.user;
      setUpdatedName(userData.username);
      setUserEmail(userData.email);
      setOldEmail(userData.email);
      setOldName(userData.username);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserChange = async (event) => {
    event.preventDefault();
    const updatedUser = {
      username: updatedName,
      email: updatedEmail,
      id: userId,
    };
    if (updatedUser.email === "") {
      updatedUser.email = oldEmail;
    }
    if (updatedUser.username === "") {
      updatedUser.username = oldName;
    }
    console.log(updatedUser);
    try {
      const response = await axios.post(URL + "/api/user/update-user", updatedUser);
      console.log(response);
      if (!response.data) {
        throw new Error(response.statusText);
      }
      setUpdatedName("");
      setUpdatedEmail("");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Error updating user. Please try again later.");
    }
  };

  return (
    <div>
    <div className="container-connection">
    <div className="register-form">
        <form onSubmit={handleUserChange}>
          <label htmlFor="username">Votre nom</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />

          <label htmlFor="email">Votre adresse courriel</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder={userEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
          />
          <input type="submit" value="Appliquer les changements" />
        </form>
        </div>
        </div>
        { role === "Etudiant" ?
        <div className="container-connection">
          <div className="register-form">
            <SectionFichiers />
          </div>
          </div>   : null }
    </div>
  );
}

export default Profil;
