import React, { useState } from "react";
import PencilStyleOptions from "./PencilStyleOptions"

import burgerIcon from "../assets/burger-icon.svg";
import "./BurgerButton.scss";

const BurgerButton = () => {
  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => {
    setToggle((prevState) => !prevState);
  };

  return (
    <>
      <div className="container-burger-button">
        <div className={toggle ? "burger active" : "burger"} onClick={toggleHandler}>
          <img src={burgerIcon} alt="burger" />
        </div>
      </div>
      {toggle ? <PencilStyleOptions /> : null}
    </>
  );
};

export default BurgerButton;
