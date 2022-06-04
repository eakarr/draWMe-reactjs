import React from "react";

import "./StyleButtons.scss";

const StyleButtons = ({ id, onClick, src }) => {
  return (
    <div className="icon-container">
      <img
        src={src}
        id={id}
        alt={id}
        onClick={onClick}
      />
    </div>
  );
};

export default StyleButtons;
