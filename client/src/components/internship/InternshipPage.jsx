import React from "react";
import { useLocation } from "react-router";

function InternshipPage(){
  const location = useLocation();
  const internship = location.state;
  console.log(internship);

    return(
        <div>
          <p>{internship.internshiptitle}</p>
        </div>
    );
}
export default InternshipPage;