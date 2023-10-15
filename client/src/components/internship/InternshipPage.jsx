import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function InternshipPage() {
  
    const { id } = useParams();
    console.log("Stage avec id:", id);
    return (
      <div>
        <h1>Liste d'étudiants : </h1>
      </div>
    );
}

export default InternshipPage;