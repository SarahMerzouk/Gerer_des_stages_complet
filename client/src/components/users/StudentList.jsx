import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import CardStudent from "../shared/cards/CardStudent";

import "./css/StudentList.css";
function StudentList() {
  const URL = process.env.REACT_APP_BASE_URL;
  const [students, setStudents] = useState([]);
  const [file, setFile] = useState(null); // Use a single file instead of an array
  const token = localStorage.getItem("jwtToken");
  axios.defaults.headers.common["x-access-token"] = token;

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]); // Set the single file instead of appending to an array
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const dropzoneStyle = {
    border: "1px solid #ccc",
    padding: "20px",
    textAlign: "center",
  };

  const dropzoneActiveStyle = {
    ...dropzoneStyle,
    borderColor: "#b3c000",
  };
  const handleDeleteAllStudent = () => {
    axios.post(URL + "/api/student/delete-all-student").then((response) => {
      setFile(null);
      axios
          .get(`${URL}/api/student/student-list`)
          .then((response) => {
            setStudents(response.data);
          })
          .catch((error) => {
            console.error("Error getting students", error);
          });
    })
      .catch((error) => {
        console.error("Error importing students", error);
      });
  }
  const handleImport = () => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("csv", file);
    axios
      .post(`${URL}/api/student/upload-csv`, formData)
      .then((response) => {
        setFile(null);
        // Retrieve updated student list
        axios
          .get(`${URL}/api/student/student-list`)
          .then((response) => {
            setStudents(response.data);
          })
          .catch((error) => {
            console.error("Error getting students", error);
          });
      })
      .catch((error) => {
        console.error("Error importing students", error);
      });
  };
  
  useEffect(() => {
    axios
      .get(`${URL}/api/student/student-list`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error getting students", error);
      });
  }, [URL]);

  return (
    <div className="Student">
      <div className="file-div">
        <div
          className="file-inputfield"
          {...getRootProps()}
          style={isDragActive ? dropzoneActiveStyle : dropzoneStyle}
        >
          <input {...getInputProps()} />
          {file ? (
            <p>{file.name}</p>
          ) : (
            <p>Cliquez ici ou glissez et déposez un fichier (optional)</p>
          )}
        </div>

        <div className="container-button-file">
          <button className="button-file" onClick={handleImport}>Importer</button>
          <button className="button-file" onClick={handleDeleteAllStudent}>Supprimer tous les Étudiants</button>
        </div>
      </div>
      <div className="div-userTable">
        <table className="UserTables">
          <thead>
            <tr className="UserList-header">
              <th className="UserList-th" scope="col">
                Id
              </th>
              <th className="UserList-th" scope="col">
                Numéro de DA
              </th>
              <th className="UserList-th" scope="col">
                Prénom et Nom
              </th>
              <th className="UserList-th" scope="col">
                Adresse Email
              </th>
              <th className="UserList-th" scope="col">
                Profil de sortie
              </th>
              <th className="UserList-th" scope="col">
                Supprimer
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <CardStudent key={student._id} student={student} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;
