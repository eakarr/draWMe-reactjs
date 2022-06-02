import rough from "roughjs/bundled/rough.esm";

const elementGenerator = rough.generator();

function createElement(id, x1, y1, x2, y2, type) {
  const roughElement =
    type === "line"
      ? elementGenerator.line(x1, y1, x2, y2)
      : elementGenerator.rectangle(x1, y1, x2 - x1, y2 - y1);
  return { id, x1, y1, x2, y2, type, roughElement };
}

export default createElement ;