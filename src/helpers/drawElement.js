import getStroke from "perfect-freehand";
import getSvgPathFromStroke from "./getSvgPathFromStroke";

const drawElement = (
  roughCanvas,
  context,
  element,
  pencilSize,
  pencilThinning,
  pencilStreamline,
  pencilSmoothing,
  pencilTaperStart,
  pencilTaperEnd,
  pencilColor
) => {
  switch (element.type) {
    case "line":
    case "rectangle":
      roughCanvas.draw(element.roughElement);
      break;
    case "pencil":
      // Perfect Freehand library needs.
      // Size and everything can be changed from here by adding an option part. The object inside of the getStroke() is where your customization goes.
      const stroke = getSvgPathFromStroke(
        getStroke(element.points, {
          size: pencilSize * 100,
          thinning: pencilThinning,
          streamline: pencilStreamline,
          smoothing: pencilSmoothing,
          start: {
            cap: true,
            taper: pencilTaperStart * 100,
          },
          end: {
            cap: true,
            taper: pencilTaperEnd * 100,
          },
        })
      );
      context.fillStyle = pencilColor;
      context.fill(new Path2D(stroke));
      break;
    case "text":
      context.textBaseline = "top";
      context.font = "24px sans-serif";
      context.fillText(element.text, element.x1, element.y1);
      break;
    default:
      throw new Error(`Type is not recognised: ${element.type}`);
  }
};

export default drawElement;
