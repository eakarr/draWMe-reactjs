import "./TrashBinModal.scss";

const TrashBinModal = ({ setTrashBinModalOpen, setToolType, setElements }) => {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="title-close-button">
          <button
            onClick={() => {
              setTrashBinModalOpen(false);
              setToolType("pencil");
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Clean All</h1>
        </div>
        <div className="body">
          <p>Are you sure you want to clean everything?</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setTrashBinModalOpen(false);
              setToolType("pencil");
            }}
            id="cancel-button"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setTrashBinModalOpen(false);
              setElements([]);
              setToolType("pencil");
            }}
            id="accept-button"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrashBinModal;
