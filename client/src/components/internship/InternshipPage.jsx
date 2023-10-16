import React from "react";
import { useLocation } from "react-router";

function InternshipPage(){
  const location = useLocation();
  const internship = location.state;
  console.log(internship);

    return(
        <div>
          <h1>{internship.internshiptitle}</h1>
          <p>{internship.internshipdescription}</p>

          <h4>Personne contact</h4>
          <p>{internship.contactname}</p>
          <p>{internship.contactemail}</p>
          <p>{internship.contactphone}</p>

          <h4>Adresse:</h4>
          <p>{internship.companyadresse}</p>

          <h4>Informations supplémentaires:</h4>
          <p>Nombre de positions pour ce stage: {internship.nbpositions}</p>
          <p>Salaire: {internship.salary} $/h</p>
          <p>Date de création: {internship.creationdate}</p>

        </div>
    );
}
export default InternshipPage;