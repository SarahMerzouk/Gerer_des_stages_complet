import React from "react";
import './css/CardFAQ.css'

function CardFAQ({ question, answer }) {
  return (
    <div className="FAQ__question">
      <input id={question} type="checkbox" className="panel" />
      <div className="plus">+</div>
      <label htmlFor={question} className="panel-title">
        {question}
      </label>
      <div className="panel-content">{answer}</div>
    </div>
  );
}

export default CardFAQ;
