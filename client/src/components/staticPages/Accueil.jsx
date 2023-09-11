import React from "react";
import "./css/StaticPages.css";
import { NavLink } from "react-router-dom";

function Accueil() {
  return (
    <div className="Accueil">
      <div className="Accueil-image"></div>
      <div className="Accueil-title-box">
        <p>
          Bienvenue sur le site des stages de fin d'études des techniques de
          l'informatique du  Collège Montmorency!
        </p>
      </div>
      <div className="accueil-flex-container">
        <div className="accueil-flex-item-card">
          <div className="accueil-flex-item-card-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              id="office"
            >
              <path
                d="M16.5 2A6.497 6.497 0 0 0 10 8.5c0 3.592 2.908 6.5 6.5 6.5S23 12.092 23 8.5 20.092 2 16.5 2zm0 1C19.556 3 22 5.444 22 8.5S19.556 14 16.5 14A5.477 5.477 0 0 1 11 8.5C11 5.444 13.444 3 16.5 3zm-5 13A6.497 6.497 0 0 0 5 22.5v.402h1V22.5c0-3.056 2.444-5.5 5.5-5.5h10c3.056 0 5.5 2.444 5.5 5.5v.402h1V22.5c0-3.592-2.908-6.5-6.5-6.5h-10zm3.559 2-.055.44-1.031 8.242 2.527 2.525 2.527-2.525L17.941 18H15.06zm.882 1h1.118l.914 7.32-1.473 1.473-1.473-1.473.914-7.32zM5 22.904V31h23v-8.096h-1V30H6v-7.096H5z"
                color="#000"
                fontFamily="sans-serif"
                fontWeight="400"
                overflow="visible"
              ></path>
            </svg>
          </div>
          <h2>Étudiants</h2>
          <span>
            À la fin de leurs études, les étudiants sont appelés à mettre en
            pratique les compétences acquises durant le programme. Ceci est
            possible grâce à la participation des entreprises de la région, qui
            les accueillent pour finaliser leur formation.
          </span>
          <NavLink className="accueil-flex-item-links" to="/EspaceEtudiant">
            Espace Étudiant
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-right arrow-icon"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </NavLink>
        </div>
        <div className="accueil-flex-item-card">
          <div className="accueil-flex-item-card-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              id="office"
            >
              <path
                d="M16 1C9.93 1 5 5.935 5 12.01c0 5.208 3.621 9.575 8.484 10.715V29.6c0 1.323 1.151 2.367 2.516 2.367s2.516-1.044 2.516-2.367v-6.875c.017-.004.036-.005.054-.008H18.588C23.416 21.55 27 17.197 27 12.014c0-6.075-4.93-11.01-11-11.01V1zm0 .918c5.574 0 10.082 4.512 10.082 10.092a10.09 10.09 0 0 1-7.703 9.808c-1.47.293-3.024.39-4.568.045a10.09 10.09 0 0 1-7.893-9.853C5.918 6.43 10.426 1.918 16 1.918zM16 3c-4.965 0-9 4.035-9 9s4.035 9 9 9 9-4.035 9-9-4.035-9-9-9zm0 1c4.424 0 8 3.576 8 8a7.96 7.96 0 0 1-1.297 4.361v-.486A3.873 3.873 0 0 0 18.828 12h-5.625c-2.141 0-3.906 1.728-3.906 3.875v.486A7.96 7.96 0 0 1 8 12c0-4.424 3.576-8 8-8zm0 .5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 1c1.394 0 2.5 1.106 2.5 2.5s-1.106 2.5-2.5 2.5A2.484 2.484 0 0 1 13.5 8c0-1.394 1.106-2.5 2.5-2.5zM13.203 13h5.625a2.85 2.85 0 0 1 2.875 2.875v1.734A7.972 7.972 0 0 1 16 20a7.972 7.972 0 0 1-5.703-2.39V15.874c0-1.602 1.298-2.875 2.906-2.875zm4.309 9.887V29.6c0 .742-.646 1.363-1.512 1.363s-1.512-.621-1.512-1.363v-6.707c1.032.134 2.047.12 3.024-.006z"
                color="#000"
                fontFamily="sans-serif"
                fontWeight="400"
                overflow="visible"
              ></path>
            </svg>
          </div>
          <h2>Employeurs</h2>
          <span>
            Le Collège Montmorency offre ainsi aux employeurs l'occasion
            d'obtenir une main-d'œuvre compétente, tout en leur permettant de
            participer à la formation finale des étudiants. Le stage de fin
            d'études est une occasion concrète d'acquérir une expérience
            professionnelle formatrice.
          </span>
          <NavLink className="accueil-flex-item-links" to="/EspaceEmployeur">
            Espace Employeur
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-right arrow-icon"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </NavLink>
        </div>
        <div className="accueil-flex-item-card">
          <div className="accueil-flex-item-card-icon">
            <svg
              className="accueil-flex-item-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              id="office"
            >
              <path
                d="M16 0c-1.277 0-2.258.872-2.688 2H12.5c-.647 0-1.198.421-1.406 1H6.5C5.678 3 5 3.678 5 4.5v26c0 .822.678 1.5 1.5 1.5h19c.822 0 1.5-.678 1.5-1.5v-26c0-.822-.678-1.5-1.5-1.5h-4.594c-.208-.579-.76-1-1.406-1h-.813C18.259.872 17.277 0 16 0zm0 1c.97 0 1.76.688 1.947 1.602L18.03 3H19.5c.286 0 .5.214.5.5v1c0 .286-.214.5-.5.5h-7a.488.488 0 0 1-.5-.5v-1c0-.286.214-.5.5-.5h1.47l.083-.398A1.986 1.986 0 0 1 16 1zM6.5 4H11v.5c0 .822.678 1.5 1.5 1.5h7c.822 0 1.5-.678 1.5-1.5V4h4.5c.286 0 .5.214.5.5v26c0 .286-.214.5-.5.5h-19a.488.488 0 0 1-.5-.5v-26c0-.286.214-.5.5-.5zM16 8.5a2.755 2.755 0 0 0-2.75 2.75A2.755 2.755 0 0 0 16 14a2.755 2.755 0 0 0 2.75-2.75A2.755 2.755 0 0 0 16 8.5zm0 1c.978 0 1.75.772 1.75 1.75S16.978 13 16 13s-1.75-.772-1.75-1.75S15.022 9.5 16 9.5zm-2.045 4.94A2.96 2.96 0 0 0 11 17.394V21h10v-3.605a2.96 2.96 0 0 0-2.955-2.956h-.27l-1.746 1.747c-.022.022-.036.022-.058 0l-1.746-1.747h-.27zm-.101 1.042 1.41 1.41a1.05 1.05 0 0 0 1.472 0l1.41-1.41c1.035.06 1.854.861 1.854 1.913V20h-8v-2.605c0-1.052.82-1.852 1.854-1.913zM9.457 23a.5.5 0 0 0 .05 1h12a.5.5 0 1 0 0-1h-12a.5.5 0 0 0-.05 0zm0 2a.5.5 0 0 0 .05 1h12a.5.5 0 1 0 0-1h-12a.5.5 0 0 0-.05 0zm3 2a.5.5 0 0 0 .05 1h6a.5.5 0 1 0 0-1h-6a.5.5 0 0 0-.05 0z"
                color="#000"
                fontFamily="sans-serif"
                fontWeight="400"
                overflow="visible"
              ></path>
            </svg>
          </div>
          <h2>Compétences</h2>
          <span className="accueil-flex-item-text">
            Les étudiants terminent la portion académique de leurs études en
            informatique selon une des deux voies de sortie du programme:
            Réseaux et sécurité informatique Développement d'applications
            informatiques.
          </span>
          <NavLink className="accueil-flex-item-links" to="/ProfilStagiaires">
            Profils Stagiaires
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-right arrow-icon"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Accueil;
