import React, { useContext, useState } from "react"; // Importez useContext de React
import UserContext from "../../../UserContext.jsx";
import axios from "axios";

function Profil() {
  const { userId } = useContext(UserContext); // Utilisez useContext directement ici
  const [updatedEmail, setUpdatedEmail] = useState();
  const [updatedName, setUpdatedName] = useState();
  const URL = "http://127.0.0.1:5001";

  const handleUserChange = async (event) => {
    event.preventDefault();
  const updatedUser = {
    username: "Florentin Toupet",
    email: "blabla@gmail.com",
    id: userId
  };
  try {
    console.log(URL)
    const response = await axios.post(
      URL + "/api/user/update-user",
      updatedUser
    );
console.log(response)
    if (!response.data) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    alert("Error updating user. Please try again later.");
  }
};




  return (
    <div>
      <h2>Test</h2>
      <textarea>

      </textarea>
      <button onClick={handleUserChange}>
        Update
      </button>
    </div>
  );
}


export default Profil;
