import React, { useState } from "react";
import PencilStyleOptions from "./PencilStyleOptions"
import RectangleStyleOptions from "./RectangleStyleOptions";

import burgerIcon from "../assets/burger-icon.svg";
import "./BurgerButton.scss";

const BurgerButton = ({toolType}) => {
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
      {toggle && toolType === "pencil" ? <PencilStyleOptions /> : null}
      {toggle && toolType === "rectangle" ? <RectangleStyleOptions /> : null}
    </>
  );
};

export default BurgerButton;
