import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../../UserContext.jsx";
import axios from "axios";
import "./css/Profil.css";

function Profil() {
  const { userId } = useContext(UserContext);
  const [userEmail, setUserEmail] = useState(""); // Pour stocker l'email de l'utilisateur actuel
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const URL = "http://127.0.0.1:5001";

  useEffect(() => {
    getUserInfo(userId);
  }, [userId]);

  const getUserInfo = async (userId) => {
    try {
      const response = await axios.get(URL+`/api/user/${userId}`);
      const userData = response.data.user;
      setUpdatedName(userData.username);
      setUserEmail(userData.email);
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
    try {
      console.log(URL);
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
          placeholder="Enter your username"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
        />

        <label htmlFor="email">Votre adresse courriel</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={userEmail}
          onChange={(e) => setUpdatedEmail(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Profil;
