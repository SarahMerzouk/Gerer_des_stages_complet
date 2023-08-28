import React, { useState, useContext, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../../UserContext";
import CustomAlert from "../../shared/customalert/CustomAlert";
import Loading from "../../shared/loading/loading";
import "./css/ApplicationForm.css";

function ApplicationForm() {
  const URL = process.env.REACT_APP_BASE_URL;
  const { internship, userId } = useContext(UserContext);
  const [emailUser, setEmailUser] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory();
  const token = localStorage.getItem("jwtToken");
  axios.defaults.headers.common["x-access-token"] = token;

  useEffect(() => {
    if (internship.companyname === undefined) {
      history.go(-1);
    }
  });

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const dropzoneStyle = {
    border: "1px solid #ccc",
    padding: "20px",
    textalign: "center",
  };

  const dropzoneActiveStyle = {
    ...dropzoneStyle,
    borderColor: "#b3c000",
  };

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("email", internship.contactemail);
    formData.append("titleInternship",internship.internshiptitle)
    formData.append("emailuser", emailUser);
    formData.append("subject", subject);
    formData.append("message", message);

    files.forEach((file) => {
      formData.append("files", file);
    });
    try {
      await axios.post(URL + "/api/email/send-message", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
  };
  if (isSubmitting) {
    return <Loading/>
  }
  return (
    <div className="form-container-application">
      <CustomAlert
        show={showAlert}
        onClose={handleCloseAlert}
        title="Message"
        message="L'email à bien été envoyé"
      />
      <div className="formbold-main-wrapper-application">
        <div className="formbold-form-wrapper-application">
          <form className="form-application" onSubmit={handleSubmit}>
            <div className="formbold-form-title-application">
              <h2 className="">
                Envoyer un Email à : {internship.companyname}
              </h2>
              <h3>{internship.contactemail}</h3>
            </div>
            <div className="formbold-mb-3">
              <div className="formbold-mb-3">
                <label className="inputText">
                  Votre email :
                  <input
                    type="email"
                    placeholder="Email"
                    className="formbold-form-input"
                    value={emailUser}
                    onChange={(e) => setEmailUser(e.target.value)}
                    required
                  />
                </label>
                <label className="inputText">
                  Sujet de l'Email
                  <input
                    type="text"
                    placeholder="Sujet"
                    className="formbold-form-input"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="formbold-mb-3">
                <label className="inputText">
                  Message :
                  <textarea
                    type="text"
                    placeholder="Description"
                    className="formbold-form-textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </label>
              </div>
              <label className="inputText">
                CV ou/et lettre de motivation :
              </label>
              <div
                className="file-inputfield"
                {...getRootProps()}
                style={isDragActive ? dropzoneActiveStyle : dropzoneStyle}
              >
                <input {...getInputProps()} />
                {files.length > 0 ? (
                  files.map((file, index) => <p key={index}>{file.name}</p>)
                ) : (
                  <p>Cliquez ici ou glissez et déposez un fichier (optional)</p>
                )}
              </div>
            </div>
            <button className="formbold-btn">Ajouter</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ApplicationForm;
