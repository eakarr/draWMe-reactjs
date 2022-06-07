import distanceCalculater from "./distanceCalculater";

const onLine = (x1, y1, x2, y2, x, y, maxDistance = 1) => {
  const a = { x: x1, y: y1 };
  const b = { x: x2, y: y2 };
  const c = { x, y };
  const offset =
    distanceCalculater(a, b) -
    (distanceCalculater(a, c) + distanceCalculater(b, c));
  return Math.abs(offset) < maxDistance ? "inside" : null; // We are giving some offset so that we can easily click on the line.
};

export default onLine