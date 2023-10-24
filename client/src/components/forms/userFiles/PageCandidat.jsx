import React, { useState } from "react";
import "./css/fichier.css";
import axios from "axios";
import { useLocation } from "react-router";
import FichierCandidat from "./FichierCandidat";

function PageCandidat() {
  const location = useLocation();
  const user = location.state;
  const student = user.user;
  const [filesList, setFilesList] = useState(null);
  const token = localStorage.getItem("jwtToken");
  axios.defaults.headers.common["x-access-token"] = token;
  const URL = process.env.REACT_APP_BASE_URL;

  const searchFiles = async (event) => {
    let tmpArray = [];

    try {
      tmpArray = await axios.get(
        URL + "/api/file/get-files",
        {
          params: { userId: student._id },
        },
        {
          headers: {
            Authorization: `Bearer` + token,
            "Content-Type": "application/json",
          },
        }
      );

      setFilesList(tmpArray.data.files);
    } catch (error) {
      console.error(error);
      console.log(error.message);
    }
  };

  if (!filesList) {
    searchFiles();
  }

  return (
    <div>
        <div class="pageCandidatDiv">
          <h2>Informations sur le candidat</h2>
          <p><strong>Nom de l'étudiant:</strong> {student.username}</p>
          <p><strong>Adresse courriel:</strong> {student.email}</p>

          <br />
          <h3>Documents:</h3>
        </div>
        <div class="pageCandidatDiv2">
          {filesList?.length == 0 ? <p><strong>Aucun fichier lié avec ce profil.</strong></p> : 
          
            filesList?.map((fichier) => {
                return <FichierCandidat key={fichier.id} fichier={fichier} />;
            })
          }
        </div>
    </div>
  );
}

export default PageCandidat;
