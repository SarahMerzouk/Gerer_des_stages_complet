import React, { useEffect, useState } from "react";
import "./css/App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Accueil from "./components/staticPages/Accueil";
import FAQ from "./components/staticPages/FAQ";
import EspaceEtudiant from "./components/staticPages/EspaceEtudiant";
import ProfilStagiaires from "./components/staticPages/ProfilStagiaires";
import Boss from "./components/internship/Boss";
import jwt_decode from "jwt-decode";
import Footer from "./Footer";
import UserContext from "./UserContext";
import InternshipUpdate from "./components/internship/InternshipUpdate";
import Student from "./components/internship/Student";
import ApplicationForm from "./components/forms/applicationForm/ApplicationForm";
import UsersList from "./components/users/UsersList";
import StudentList from "./components/users/StudentList";
import NavbarApp from "./components/shared/navigation/NavBarApp";
import Connection from "./components/forms/connectionForm/Connection";
import EmailChecker from "./components/email/EmailChecker.jsx";
import EnterEmail from "./components/email/EnterEmail";
import ChangePassword from "./components/email/ChangePassword";

function App() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState("guess");
  const [userId, setUserId] = useState("");
  const [internshipsList, setInternshipList] = useState([]);
  const [internship, setInternship] = useState([]);

  function isTokenExpired(token) {
    try {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp && decoded.exp < currentTime) {
        // Token is expired
        return true;
      } else {
        // Token is not expired
        return false;
      }
    } catch (error) {
      // Error occurred while decoding, token might be invalid
      return true;
    }
  }

  useEffect(() => {
    let token = localStorage.getItem("jwtToken");
    if (token !== null && token !== "" && !isTokenExpired(token)) {
      try {
        const decoded = jwt_decode(token);
        const userType = decoded.usertype;
        const userId = decoded._id;
        handleRole(userType);
        handleUserId(userId);
        handleLogin(token);
      } catch (err) {
        console.error("Invalid token:", err);
        handleLogin("");
        handleRole("");
        handleUserId("");
      }
    } else {
      handleLogin("");
      handleRole("");
      handleUserId("");
    }
  });

  const handleUserId = (newUserId) => {
    setUserId(newUserId);
  };
  const handleRole = (newRole) => {
    setRole(newRole);
  };
  const handleLogin = (newToken) => {
    localStorage.setItem("jwtToken", newToken);
    setToken(newToken);
  };

  const checkToken = (role) => {
    try {
      let token = localStorage.getItem("jwtToken");
      if (token !== null && token !== "" && !isTokenExpired(token)) {
        const decoded = jwt_decode(token);
        const userType = decoded.usertype;
        if (userType === role) {
          return true;
        }
        return false;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    handleRole("");
  };
  const handleInternshipsList = (newList) => {
    setInternshipList(newList);
  };
  const handleInternship = (newInternship) => {
    setInternship(newInternship);
  };

  return (
    <UserContext.Provider
      value={{
        token,
        role,
        userId,
        internshipsList,
        internship,
        handleUserId,
        handleRole,
        handleLogin,
        handleLogout,
        handleInternshipsList,
        handleInternship,
      }}
    >
      <Router>
        <NavbarApp role={role} />
        <main className="app">
          <Switch>
            <Route path="/FAQ" exact>
              <FAQ />
            </Route>
            <Route path="/EspaceEtudiant">
              <EspaceEtudiant />
            </Route>
            <Route path="/ProfilStagiaires">
              <ProfilStagiaires />
            </Route>
            <Route path="/Login">
              {token ? <Redirect to="/" /> : <Connection/>}
            </Route>
            <Route path="/Employeur/publierstage">
              <Boss isCoordinateur={false} />
            </Route>
            <Route path="/Etudiant/stageDisponible">
              <Student />
            </Route>
            <Route path="/Employeur/updateStage">
              <InternshipUpdate />
            </Route>
            <Route path="/Etudiant/applicationForm">
              <ApplicationForm />
            </Route>
            <Route path="/Coordinateur/listeUtilisateurs">
              {!checkToken("Coordinateur") ? (
                <Redirect to="/" />
              ) : (
                <UsersList />
              )}
            </Route>
            <Route path="/Coordinateur/listeStage">
              {!checkToken("Coordinateur") ? (
                <Redirect to="/" />
              ) : (
                <Boss isCoordinateur={true} />
              )}
            </Route>
            <Route path="/Coordinateur/listeEtudiant">
              {!checkToken("Coordinateur") ? (
                <Redirect to="/" />
              ) : (
                <StudentList />
              )}
            </Route>
            <Route path="/users/:id/verify/:token">
                <EmailChecker/>
            </Route>
            <Route path="/users/:id/changepassword/:token">
                <ChangePassword/>
            </Route>
            <Route path="/users/EnterEmail">
                <EnterEmail/>
            </Route>
            <Route
              path="/logout"
              render={() => {
                handleLogout();
                return <Redirect to="/" />;
              }}
            />
            <Route path="">
              <Accueil />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
        <Footer />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
