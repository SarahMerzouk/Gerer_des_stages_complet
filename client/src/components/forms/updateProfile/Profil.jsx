import React, { useContext } from "react"; // Importez useContext de React
import UserContext from "../../../UserContext.jsx";

function Profil() {
  const { userId } = useContext(UserContext); // Utilisez useContext directement ici
  console.log(userId);

  return (
    <div>
      <h2>Test</h2>
      <button>
        Yes
      </button>
    </div>
  );
}

export default Profil;
