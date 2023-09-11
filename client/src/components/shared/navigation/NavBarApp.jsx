import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/NavBarApp.css";

function NavBarApp({ role }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(
      role === "Employeur" || role === "Etudiant" || role === "Coordinateur"
    );
  }, [role]);

  return (
    <Navbar bg="light" expand="lg" className="main-header">
      <Navbar.Brand as={Link} to="/" className="img">
        <div className="main-navigation__logo-img">
          <img
            src="https://www.cmontmorency.qc.ca/wp-content/uploads/2018/03/Logomo_1400.png"
            alt="Logo"
            className="img"
          />
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav navbar">
        <Nav className="mr-auto link-element">
          <Nav.Link className="link-element" as={Link} to="/">
            Accueil
          </Nav.Link>
          <NavDropdown
            className="link-element navElements"
            title="Gestion des stages"
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item as={Link} to="/EspaceEtudiant">
              Espace Étudiant
            </NavDropdown.Item>
            {role === "Etudiant" && (
              <NavDropdown.Item as={Link} to={`/${role}/stageDisponible`}>
                Stages Disponibles
              </NavDropdown.Item>
            )}
            {role === "Employeur" && (
              <NavDropdown.Item as={Link} to={`/${role}/publierstage`}>
                Publier Stage
              </NavDropdown.Item>
            )}
            {role === "Coordinateur" && (
              <>
                <NavDropdown.Item as={Link} to={`/${role}/listeStage`}>
                  Liste de Stage
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={`/${role}/listeEtudiant`}>
                  Liste d'Étudiant
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={`/${role}/listeUtilisateurs`}>
                  Liste d'utilisateurs
                </NavDropdown.Item>
              </>
            )}
          </NavDropdown>
          <Nav.Link className="link-element" as={Link} to="/ProfilStagiaires">
            Profils stagiaires
          </Nav.Link>
          <Nav.Link className="link-element" as={Link} to="/FAQ">
            FAQ
          </Nav.Link>
          {!isLoggedIn && (
            <Nav.Link
              className="link-element align-right"
              as={Link}
              to="/login"
            >
              Se connecter
            </Nav.Link>
          )}
          {isLoggedIn && (
            <Nav.Link
              className="link-element align-right"
              as={Link}
              to="/logout"
            >
              Se déconnecter
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBarApp;
