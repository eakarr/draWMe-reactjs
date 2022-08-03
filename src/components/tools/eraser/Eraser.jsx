import React, { useContext } from "react";

import { StyleOptionsContext } from "../../../context/StyleOptionsContext";

const Eraser = () => {
  const { toolType, setToolType } = useContext(StyleOptionsContext);
  return (
    <button
      onClick={() => setToolType("eraser")}
      id={"eraser"}
      className={toolType === "eraser" ? "flex flex-acenter flex-jcenter tool active" : "flex flex-acenter flex-jcenter tool"}
    >
      <img src="/assets/eraser-icon.svg" alt="eraser" />
    </button>
  );
};

export default Eraser;