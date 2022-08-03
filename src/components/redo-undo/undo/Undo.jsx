const Undo = (props) => {
  const { undo } = props;
  return (
    <button
      onClick={undo}
      className="undo flex flex-jcenter flex-acenter"
    >
      <img src="/assets/undo-icon.svg" alt={"undo"} />
    </button>
  );
};

export default Undo;
