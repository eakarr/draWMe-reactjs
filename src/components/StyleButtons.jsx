import React from "react";

import "./StyleButtons.scss";

const StyleButtons = ({ id, onClick, src, toolType }) => {
  return (
    <button
      onClick={onClick}
      id={id}
      className={toolType === id ? "icon-container active" : "icon-container"}
    >
      <img src={src} alt={id} />
    </button>
  );
};

export default StyleButtons;
