import rough from "roughjs/bundled/rough.esm";

const elementGenerator = rough.generator();

const createElement = (
  id,
  x1,
  y1,
  x2,
  y2,
  type,
  lineStyleOptions,
  rectangleStyleOptions,
  pencilColor
) => {
  switch (type) {
    case "line":
    case "rectangle":
      const roughElement =
        type === "line"
          ? elementGenerator.line(x1, y1, x2, y2, lineStyleOptions)
          : elementGenerator.rectangle(
              x1,
              y1,
              x2 - x1,
              y2 - y1,
              rectangleStyleOptions
            );
      return { id, x1, y1, x2, y2, type, roughElement };
    case "pencil":
      return { id, type, points: [{ x: x1, y: y1 }], color: pencilColor };
    case "text":
      return { id, type, x1, y1, x2, y2, text: "" };
    default:
      throw new Error(`Type not recognised: ${type}`);
  }
};

export default createElement;
