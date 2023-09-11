import React from "react";
import "./css/loading.css";

function Loading() {
  return (
    <div className="custom-alertL">
      <div className="custom-alert-contentL">
        Chargement en cours<div className="custom-loader"></div>
      </div>
    </div>
  );
}

export default Loading;
