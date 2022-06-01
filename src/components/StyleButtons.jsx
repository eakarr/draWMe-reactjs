import React from "react";

import "./StyleButtons.scss";

const StyleButtons = ({ type, id, checked, onChange }) => {
  return (
    <div className="radio-container">
      <input type={type} id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{id}</label>
    </div>
  );
};

export default StyleButtons;
