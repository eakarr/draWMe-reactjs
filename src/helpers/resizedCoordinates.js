// clientX and clientY are the mouses position.
const resizedCoodinates = (clientX, clientY, position, coordinates) => {
  const { x1, y1, x2, y2 } = coordinates;
  switch (position) {
    case "topLeft":
    case "start":
      return { x1: clientX, y1: clientY, x2, y2 };
    case "topRight":
      return { x1, y1: clientY, x2: clientX, y2 };
    case "bottomLeft":
      return { x1: clientX, y1, x2, y2: clientY };
    case "bottomRight":
    case "end":
      return { x1, y1, x2: clientX, y2: clientY };
    default:
      return null; // It should not get here...
  }
};

export default resizedCoodinates;
