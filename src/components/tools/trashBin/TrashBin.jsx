import React, { useContext } from "react";

import { StyleOptionsContext } from "../../../context/StyleOptionsContext";
import TrashBinModal from "./trashBin-modal/TrashBinModal";

const TrashBin = () => {
  const { setToolType, setTrashBinModalOpen,trashBinModalOpen } = useContext(StyleOptionsContext);

  const trashBinButtonHandler = () => {
    setToolType("eraseAll");
    setTrashBinModalOpen(true);
  };

  return (
    <>
      <button
        onClick={trashBinButtonHandler}
        id={"eraseAll"}
        className="flex flex-acenter flex-jcenter tool"
      >
        <img src="/assets/trash-bin-icon.svg" alt={"erase all"} />
      </button>

      {trashBinModalOpen ? <TrashBinModal /> : null}
    </>
  );
};

export default TrashBin;
