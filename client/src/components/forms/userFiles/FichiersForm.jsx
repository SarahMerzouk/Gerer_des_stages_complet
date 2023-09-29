import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../../UserContext.jsx";
import axios from "axios";

/**
 * Form pour ajouter des fichiers au profil
 * @returns Un form
 */
function FichiersForm(props) {
    const {userId} = useContext(UserContext);
    const {token} = useContext(UserContext);
    const [title, setTitle] = useState("Choisir");
    const [link, setLink] = useState("");
    const [error, setError] = useState("");
    const URL = process.env.REACT_APP_BASE_URL;

    const handleAddFile = async (event) => {
        setError("");
        event.preventDefault();

        if (title != "Choisir" && link != "") {
            try {
                axios.post(URL + "/api/file/add-files", {
                    studentId: userId,
                    title: title,
                    link: link
                },
                {
                    headers: {
                        "Authorization": `Bearer`  + token,
                        "x-access-token": token,
                        "Content-Type": "application/json"
                    }
                });
                setTitle("Choisir");
                setLink("");
                props.reloadMethod();
            } catch (error) {
                console.error(error);
                console.log(error);
                setError("Une erreur est survenue");
            }
        } else {
            setError("Veuillez remplir tout les champs.");
        }
    }

    return (
        <React.Fragment>
            <h2>Ajouter un fichier</h2>
            <form onSubmit={handleAddFile}>
            {error && <p className="error">{error}</p>}
                <label htmlFor="title">Choissir le type de fichier</label>
                <select
                    name="title"
                    placeholder="Title"
                    required=""
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-file-input">
                    <option value="Chosir">Choisir</option>
                    <option value="CV">CV</option>
                    <option value="Lettre de motivation">Lettre de motivation</option>
                    <option value="Lettre de recommendation">Lettre de recommendation</option>
                    <option value="Autre">Autre</option>
                </select>

                <label htmlFor="link">Lien vers votre fichier</label>
                <input
                    type="text"
                    id="link"
                    name="link"
                    value={link}
                    placeholder={link}
                    onChange={(e) => setLink(e.target.value)} />
                
                <input type="submit" value="Ajouter le fichier" />
            </form>
        </React.Fragment>
    );
}

export default FichiersForm;