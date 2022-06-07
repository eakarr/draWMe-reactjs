import getStroke from "perfect-freehand";
import getSvgPathFromStroke from "./getSvgPathFromStroke";

const drawElement = (roughCanvas, context, element) => {
  switch (element.type) {
    case "line":
    case "rectangle":
      roughCanvas.draw(element.roughElement);
      break;
    case "pencil":
      // Perfect Freehand library needs.
      // Size and everything can be changed from here by adding an option part. The object inside of the getStroke() is where your customization goes.
      const stroke = getSvgPathFromStroke(
        getStroke(element.points, { size: 4 })
      );
      context.fill(new Path2D(stroke));
      break;
    case "text":
      context.textBaseLine = "top";
      context.font = "24px sans-serif";
      context.fillText(element.text, element.x1, element.y1);
      break;
    default:
      throw new Error(`Type is not recognised: ${element.type}`);
  }
};

export default drawElement;
