import React, { useContext, useState, useEffect } from "react";
import UserContext  from "../../../UserContext";
import axios from "axios";
import "./css/fichier.css"

function Fichier(props) {

    return (
        <div>
            <h4 id="titreFichier">{props.fichier.title}</h4>
            <a href={props.fichier.link} target="_blank">Voir le fichier</a>
        </div>
    )
}

export default Fichier;