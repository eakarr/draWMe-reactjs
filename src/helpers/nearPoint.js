// nearPoint function allows us to capturing the points of the drawing with an offset like < 5.
const nearPoint = (x, y, x1, y1, name) => {
  return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null; // We are giving some offset so that we can easily click on the line.
};

export default nearPoint;