import React from "react";
import "./css/fichier.css";
import icon from "./img/icon.png";

function FichierCandidat(props) {
  return (
    <a href={props.fichier.link} target="_blank" rel="noreferrer">
      <div class="fichierCandidatDiv">
        <img src={icon} alt="icone" />
        <p id="titreFichierCandidat">{props.fichier.title}</p>
      </div>
    </a>
  );
}

export default FichierCandidat;
