// cursorChangerForPositions allows us to get different cursors while we are on the corner of the drawings.
const cursorChangerForPositions = (position) => {
  switch (position) {
    case "topLeft":
    case "bottomRight":
    case "start":
    case "end":
      return "nwse-resize"; // name of the cursor element //nort-west-south-east resize handle
    case "topRight":
    case "bottomLeft":
      return "nesw-resize"; // name of the cursor element //nort-east-south-west resize handle
    default:
      return "move";
  }
};

export default cursorChangerForPositions;
