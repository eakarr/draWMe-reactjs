import React from "react";

import "./TrashBinButton.scss";
import trashBinIcon from "../assets/trash-bin-icon.svg";

const TrashBinButton = ({ onClick }) => {
  return (
    <button onClick={onClick} id={"eraseAll"} className="trash-bin-icon">
      <img src={trashBinIcon} alt={"eraseAll"} />
    </button>
  );
};

export default TrashBinButton;
