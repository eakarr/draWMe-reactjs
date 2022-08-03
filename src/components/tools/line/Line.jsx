import React, { useContext } from "react";

import { StyleOptionsContext } from "../../../context/StyleOptionsContext";

const Line = () => {
  const { toolType, setToolType } = useContext(StyleOptionsContext);
  return (
    <button
      onClick={() => setToolType("line")}
      id={"line"}
      className={toolType === "line" ? "flex flex-acenter flex-jcenter tool active" : "flex flex-acenter flex-jcenter tool"}
    >
      <img src="/assets/line-icon.svg" alt="line" />
    </button>
  );
};

export default Line;