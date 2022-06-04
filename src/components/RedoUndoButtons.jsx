import React from "react";

import "./RedoUndoButtons.scss";
import undoIcon from "../assets/undo-icon.svg";
import redoIcon from "../assets/redo-icon.svg";

const RedoUndoButtons = ({undo, redo}) => {
  return (
    <div className="container-undo-redo-buttons">
      <button onClick={undo} className="redo-undo-container">
        <img src={undoIcon} alt={"undo"} />
      </button>
      <button onClick={redo} className="redo-undo-container">
        <img src={redoIcon} alt={"redo"} />
      </button>
    </div>
  );
};

export default RedoUndoButtons;
