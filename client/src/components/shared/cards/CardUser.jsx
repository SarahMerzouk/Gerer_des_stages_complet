import React, { useState } from "react";
import axios from "axios";

import "../../users/css/UsersList.css";
function CardUser({ user }) {
  const [selectedRole, setSelectedRole] = useState(user.usertype);
  const URL = process.env.REACT_APP_BASE_URL;
  const objectDate = new Date(user.creationdate);
  const date =
    objectDate.getDate() +
    "/" +
    objectDate.getMonth() +
    "/" +
    objectDate.getFullYear();

  const handleDelete = async (event) => {
    window.location.reload();
    const userId = user._id;
    await axios
      .delete(URL + "/api/user/delete-user", {
        data: { userId: userId },
      })
      .catch((error) => {
        console.log(error);
      });
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
      userId: user._id,
      password: password,
      usertype: newRole,
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
    </tr>
  );
}

export default CardUser;
