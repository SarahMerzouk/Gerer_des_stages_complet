import React, { useContext, useState} from "react";
import FichiersForm from "./FichiersForm";
import Fichier from "./Fichier";
import UserContext from "../../../UserContext";
import "./css/fichier.css"
import axios from "axios";

function SectionFichiers() {
    const { userId } = useContext(UserContext);
    const [fichiers, setFichiers] = useState(null);
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["x-access-token"] = token;
    const URL = process.env.REACT_APP_BASE_URL;

    const searchFiles = async (event) => {
        let tmpArray = [];

        try {
            tmpArray = await axios.get(URL + "/api/file/get-files", {
                params: { userId: userId }
            },
            {
                headers: {
                    "Authorization": `Bearer`  + token,
                    "Content-Type": "application/json"
                }
            });

            setFichiers(tmpArray.data.files);
        } catch (error) {
            console.error(error);
            console.log(error.message);
        }
    }

    if (!fichiers && userId !== "")
    {
        searchFiles();
    }


    function reloadMethod() {
        window.location.reload();
    }

    return (
        <div>
            <h2 className="h2">Vos fichiers</h2>
            <p className="p">Maximum de 3 fichiers. Veuillez déposer vos fichiers par un service de stockage en ligne (ex: Google Drive, DropBox, etc.). 
            Assurez vous que l'accès soit public.</p>
            {fichiers?.map((fichier) =>
                {
                    return (<Fichier key={fichier.id} fichier={fichier} />);
                }
            )}
            {fichiers?.length < 3 ? <FichiersForm reloadMethod={reloadMethod} /> : null}
        </div>
    )
}

export default SectionFichiers;