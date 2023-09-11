import React from "react";
import axios from "axios";

function CardStudent({student}){
  const URL = process.env.REACT_APP_BASE_URL;
    const handleDelete = async (event) => {
        window.location.reload();
        const userId = student._id;
        await axios
          .delete(URL + "/api/student/delete-student", {
            data: { userId: userId },
          })
          .catch((error) => {
            console.error(error);
          });
      };

    return(
        <tr className="UserList-header">
            <td className="UserList-td">{student._id}</td>
            <td className="UserList-td">{student.DAnumber}</td>
            <td className="UserList-td">{student.studentName}</td>
            <td className="UserList-td">{student.email}</td>
            <td className="UserList-td">{student.decType}</td>
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
        </tr>
    );
}

export default CardStudent;