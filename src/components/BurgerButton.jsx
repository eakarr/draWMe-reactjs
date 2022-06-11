import React from "react";

import burgerIcon from "../assets/burger-icon.svg";
import "./BurgerButton.scss";

const BurgerButton = () => {
  return (
    <div className="container-burger-button">
      <div className="icon-container">
        <img src={burgerIcon} alt="burger" />
      </div>
    </div>
  );
};

export default BurgerButton;
