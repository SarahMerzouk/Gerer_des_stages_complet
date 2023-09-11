import React from "react";
import "./css/CustomAlert.css";

function CustomAlertInput(props) {
  const handleClick = () => {
    props.onClose();
  };

  return (
    <div className={`custom-alert ${props.show ? "show" : ""}`}>
      <div className="custom-alert-content">
        <h3 className="custom-alert-title">{props.title}</h3>
        {props.error && <p className="error">{props.error}</p>}
        <p className="custom-alert-message">{props.message}</p>
        <label className="custom-alert-message">
          Choisir le stage
          <select
            className="formbold-form-input"
            value={props.input}
            onChange={(e) => props.setter(e.target.value)}
            required
          >
            {props.internshipList.map((internship) => (
              <option key={internship._id} value={internship._id}>
                {internship.internshiptitle}
              </option>
            ))}
          </select>
        </label>
        <div>
          <button className="custom-alert-button" onClick={props.handleSubmit}>
            Valider
          </button>
          <button className="custom-alert-button red" onClick={handleClick}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomAlertInput;
