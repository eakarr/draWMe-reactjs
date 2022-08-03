import React, { useContext } from "react";

import { StyleOptionsContext } from "../../../context/StyleOptionsContext";

const Selection = () => {
  const { toolType, setToolType } = useContext(StyleOptionsContext);
  return (
    <button
      onClick={() => setToolType("selection")}
      id={"selection"}
      className={toolType === "selection" ? "flex flex-acenter flex-jcenter tool active" : "flex flex-acenter flex-jcenter tool"}
    >
      <img src="/assets/mouse-icon.svg" alt="selection" />
    </button>
  );
};

export default Selection;
