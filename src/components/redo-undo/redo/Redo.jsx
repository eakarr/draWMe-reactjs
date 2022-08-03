const Redo = (props) => {
  const { redo } = props;
  return (
    <button
      onClick={redo}
      className="redo flex flex-jcenter flex-acenter"
    >
      <img src="/assets/redo-icon.svg" alt={"redo"} />
    </button>
  );
};

export default Redo;
