import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../UserContext";
import CardUser from "../shared/cards/CardUser";
import Loading from "../shared/loading/loading";

import "./css/UsersList.css";
function UsersList() {
  const URL = process.env.REACT_APP_BASE_URL;
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { role } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("jwtToken");
  axios.defaults.headers.common["x-access-token"] = token;
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      if (role === "Coordinateur") {
        try {
          const response = await axios.get(URL + "/api/user/all-users");
          setUserList(response.data.users);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  }

  const filterAndSearchUsers = (users) => {
    let filteredUsers = users;
    if (searchTerm !== "") {
      try {
        const escapedSearchTerm = escapeRegExp(searchTerm);
        const searchRegex = new RegExp(escapedSearchTerm, "i");
        filteredUsers = filteredUsers.filter((user) =>
          [
            user._id,
            user.username,
            user.creationdate,
            user.usertype,
            user.email,
            user.internshiptitle,
            user.internshiptype,
            user.internshipdescription,
            user.salary,
          ].some((value) => searchRegex.test(value))
        );
      } catch (error) {
        console.error("Invalid regex: ", error);
        // Handle the error, e.g., show an error message or fallback to another search method
      }
    }
    return filteredUsers;
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="UserList">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="UserTable">
        <thead className="center">
          <tr className="UserList-header">
            <th className="UserList-th" scope="col">
              Id
            </th>
            <th className="UserList-th" scope="col">
              Nom d'Utilisateurs
            </th>
            <th className="UserList-th" scope="col">
              Date de Création
            </th>
            <th className="UserList-th" scope="col">
              Role
            </th>
            <th className="UserList-th" scope="col">
              Email
            </th>
            <th className="UserList-th" scope="col">
              Supprimer
            </th>
            <th className="UserList-th" scope="col">
              Changer rôle
            </th>
            <th className="UserList-th" scope="col">
            Ajouter Étudiant
          </th>
          </tr>
        </thead>
        <tbody className="center">
          {userList &&
            filterAndSearchUsers(userList).map((user) => (
              <CardUser key={user._id} user={user} />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;
