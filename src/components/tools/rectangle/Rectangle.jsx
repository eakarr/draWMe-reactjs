import React, { useContext } from "react";

import { StyleOptionsContext } from "../../../context/StyleOptionsContext";

const Rectangle = () => {
  const { toolType, setToolType } = useContext(StyleOptionsContext);
  return (
    <button
      onClick={() => setToolType("rectangle")}
      id={"rectangle"}
      className={toolType === "rectangle" ? "flex flex-acenter flex-jcenter tool active" : "flex flex-acenter flex-jcenter tool"}
    >
      <img src="/assets/rectangle-icon.svg" alt="rectangle" />
    </button>
  );
};

export default Rectangle;