import React, { useContext } from "react";

import { StyleOptionsContext } from "../../../context/StyleOptionsContext";

const Pencil = () => {
  const { toolType, setToolType } = useContext(StyleOptionsContext);
  return (
    <button
      onClick={() => setToolType("pencil")}
      id={"pencil"}
      className={toolType === "pencil" ? "flex flex-acenter flex-jcenter tool active" : "flex flex-acenter flex-jcenter tool"}
    >
      <img src="/assets/pencil-icon.svg" alt="pencil" />
    </button>
  );
};

export default Pencil;