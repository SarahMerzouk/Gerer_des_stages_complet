import React, { useState } from "react";
import "./css/fichier.css"
import axios from "axios";
import { useLocation } from "react-router";
import Fichier from "./Fichier";

function PageCandidat(props) {
    const location = useLocation();
    const user = location.state;
    const student = user.user;
    const [filesList, setFilesList] = useState(null);
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["x-access-token"] = token;
    const URL = process.env.REACT_APP_BASE_URL;

    const searchFiles = async (event) => {
        let tmpArray = [];

        try {
            tmpArray = await axios.get(URL + "/api/file/get-files", {
                params: { userId: student._id }
            },
            {
                headers: {
                    "Authorization": `Bearer`  + token,
                    "Content-Type": "application/json"
                }
            });
            
            setFilesList(tmpArray.data.files);
        } catch (error) {
            console.error(error);
            console.log(error.message);
        }
    }

    if (!filesList)
    {
        searchFiles();
    }

    return (
        <div>
            <h1>{student.username}</h1>
            <h2>{student.email}</h2>


            {filesList?.map((fichier) =>
                {
                    return (<Fichier key={fichier.id} fichier={fichier} />);
                }
            )}
            
        </div>
    )
}

export default PageCandidat;