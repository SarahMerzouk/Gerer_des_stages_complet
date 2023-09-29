import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../../UserContext.jsx";
import SectionFichiers from "../userFiles/SectionFichiers.jsx";
import axios from "axios";
import "./css/Profil.css";

function Profil() {
  const { userId } = useContext(UserContext);
  const [userEmail, setUserEmail] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [oldName, setOldName] = useState("");
  const [oldEmail, setOldEmail] = useState("");
  const URL = "http://127.0.0.1:5001"; // HARDCODE


  useEffect(() => {
    getUserInfo(userId);
  }, [userId]);

  useEffect(() => {
    setUserEmail(updatedEmail);
  }, [updatedEmail]);

  const getUserInfo = async (userId) => {
    try {
      const response = await axios.get(URL+`/api/user/${userId}`);
      const userData = response.data.user;
      setUpdatedName(userData.username);
      setUserEmail(userData.email);
      setOldEmail(userData.email)
      setOldName(userData.username)
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserChange = async (event) => {
    event.preventDefault();
    const updatedUser = {
      username: updatedName,
      email: updatedEmail,
      id: userId
    };
    if(updatedUser.email==''){
      updatedUser.email=oldEmail;
    }
    if(updatedUser.username==''){
      updatedUser.username=oldName;
    }
    console.log(updatedUser)
    try {
      const response = await axios.post(
        URL + "/api/user/update-user",
        updatedUser
      );
      console.log(response);
      if (!response.data) {
        throw new Error(response.statusText);
      }
      setUpdatedName("");
      setUpdatedEmail("");
    } catch (error) {
      console.error(error);
      alert("Error updating user. Please try again later.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleUserChange}>
        <label htmlFor="username">Votre nom</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder={updatedName}
          // value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
        />

        <label htmlFor="email">Votre adresse courriel</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder={userEmail}
          // value={userEmail} // Utilisez l'email de l'utilisateur actuel
          onChange={(e) => setUpdatedEmail(e.target.value)}
        />
        <input type="submit" value="Appliquer les changements" />
      </form>

      <div>
        <SectionFichiers />
      </div>
    </div>
  );
}

export default Profil;
