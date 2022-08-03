import { useContext } from "react";
import { StyleOptionsContext } from "../../../../context/StyleOptionsContext";

const TrashBinModal = () => {
  const { setTrashBinModalOpen, setToolType, setElements } =
    useContext(StyleOptionsContext);

  const modalCancelHandler = () => {
    setTrashBinModalOpen(false);
    setToolType("pencil");
  };

  const modalAcceptHandler = () => {
    setTrashBinModalOpen(false);
    setElements([]);
    setToolType("pencil");
  };

  const stopBubbling = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="modal-background position-fixed flex flex-jcenter flex-acenter"
      onClick={modalCancelHandler}
    >
      <div className="modal-container flex flex-dcolumn" onClick={stopBubbling}>
        <div className="title-close-button flex flex-jend">
          <button onClick={modalCancelHandler}>X</button>
        </div>
        <div className="modal-container-title display-iblock text-acenter">
          <h1>Clean All</h1>
        </div>
        <div className="modal-container-body flex flex-jcenter flex-acenter text-acenter">
          <p>Are you sure you want to clean everything?</p>
        </div>
        <div className="modal-container-footer flex flex-jcenter flex-acenter">
          <button onClick={modalCancelHandler} id="cancel-button">
            Cancel
          </button>
          <button onClick={modalAcceptHandler} id="accept-button">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrashBinModal;
