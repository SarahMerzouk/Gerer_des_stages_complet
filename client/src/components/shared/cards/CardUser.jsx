import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../../../UserContext";
import CustomAlertInput from "../customalert/CustomAlertInput";
import CustomAlert from "../customalert/CustomAlert";
import "../../users/css/UsersList.css";
function CardUser({ user }) {
  const [selectedRole, setSelectedRole] = useState(user.usertype);
  const [internshipId, setInternshipId] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [internshipList, setInternshipList] = useState([]);
  const { userId } = useContext(UserContext);
  const URL = process.env.REACT_APP_BASE_URL;

  const objectDate = new Date(user.creationdate);
  const date =
    objectDate.getDate() +
    "/" +
    objectDate.getMonth() +
    "/" +
    objectDate.getFullYear();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          URL + "/api/internship/all-internship"
        );
        setInternshipList(response.data.internships);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAlert]);

  const handleDelete = async (event) => {
    window.location.reload();
    const userId = user._id;
    await axios
      .delete(URL + "/api/user/delete-user", {
        data: { userId: userId },
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddApplicant = async (event) => {
    event.preventDefault();
    setError("");

    if (!internshipId) {
      setError("No internship selected");
      return;
    }

    console.error(internshipId);
    try {
      await axios
        .post(URL + "/api/internship/add-student", {
          internshipId: internshipId,
          userId: user._id,
        })
        .catch((error) => {
          setError(error.response.data);
          console.error(error);
        });
      handleConfirm(true);
    } catch (err) {
      console.error("Error handle applicant", err);
    }
  };

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleConfirm = () => {
    setShowConfirm(true);
    setShowAlert(false);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
  };

  const handleRoleChange = async (event) => {
    event.preventDefault();

    const newRole = event.target.value;
    if (newRole === selectedRole) {
      return;
    }
    const password = prompt("Please enter your password:");
    if (!password) {
      return;
    }

    const updatedUser = {
      userId: userId,
      password: password,
      usertype: newRole,
      userIdtoChange: user._id,
    };
    try {
      const response = await axios.patch(
        URL + "/api/user/update-role",
        updatedUser
      );

      if (!response.data) {
        throw new Error(response.statusText);
      }
      setSelectedRole(newRole);
    } catch (error) {
      console.error(error);
      alert("Error updating user role. Please try again later.");
    }
  };

  return (
    <>
      <CustomAlertInput
        show={showAlert}
        onClose={handleCloseAlert}
        title="Message"
        message="Ajouter un Étudiant à un Stage"
        error={error.message} // Pass error.message instead of error
        setter={setInternshipId}
        input={internshipId}
        internshipList={internshipList}
        handleSubmit={handleAddApplicant}
      />
      <CustomAlert
        show={showConfirm}
        onClose={handleCloseConfirm}
        title="Message"
        message="L'Étudiant à bien été ajouter"
      />
      <tr className="UserList-header">
        <td className="UserList-td">{user._id}</td>
        <td className="UserList-td">{user.username}</td>
        <td className="UserList-td">{date}</td>
        <td className="UserList-td">{selectedRole}</td>
        <td className="UserList-td">{user.email}</td>
        <td className="UserList-td UserList-delete">
          <button onClick={handleDelete} className="UserList-delete-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fillRule="currentColor"
              className="bi bi-trash-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
            </svg>
          </button>
        </td>
        <td className="UserList-td">
          <select
            className="select"
            value={selectedRole}
            onChange={handleRoleChange}
          >
            <option value="Employeur">Employeur</option>
            <option value="Etudiant">Etudiant</option>
            <option value="Coordinateur">Coordinateur</option>
          </select>
        </td>
        <td className="UserList-td centerButton">
          <button
            onClick={() => handleShowAlert(true)}
            className="UserList-delete-button addButton"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-add"
              viewBox="0 0 16 16"
            >
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
              <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
            </svg>
          </button>
        </td>
      </tr>
    </>
  );
}

export default CardUser;
