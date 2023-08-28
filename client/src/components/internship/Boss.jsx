import React from "react";
import InternshipList from "./InternshipList";
import InternshipForm from "../forms/internshipForm/InternshipForm";
import "./css/Boss.css";

function Boss({ isCoordinateur }) {
  return (
    <div className="Boss">
      <InternshipForm />
      <div className="boss-content">
      <InternshipList isCoordinateur={isCoordinateur} />
      </div>
    </div>
  );
}
export default Boss;
