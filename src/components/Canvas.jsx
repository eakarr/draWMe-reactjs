import { useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm";
import StyleButtons from "./StyleButtons";

import "./Canvas.scss";

const elementGenerator = rough.generator();

function createElement(x1, y1, x2, y2, type) {
  const roughElement =
    type === "line"
      ? elementGenerator.line(x1, y1, x2, y2)
      : elementGenerator.rectangle(x1, y1, x2 - x1, y2 - y1);
  return { x1, y1, x2, y2, roughElement };
}

const Canvas = () => {
  const [elements, setElements] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [elementType, setElementType] = useState("line");

  ////////////////////////////////////////////////////////////////////////////////////

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height); // This cleans the previous draws. (x:0, y:0, canvas width, canvas height)

    const roughCanvas = rough.canvas(canvas); // Initializing the RoughJS

    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
  }, [elements]);

  ////////////////////////////////////////////////////////////////////////////////////

  const mouseDownHandler = (event) => {
    setIsDrawing(true);

    const { clientX, clientY } = event;

    const element = createElement(
      clientX,
      clientY,
      clientX,
      clientY,
      elementType
    );
    setElements((prevState) => [...prevState, element]);
  };

  ////////////////////////////////////////////////////////////////////////////////////

  const mouseMoveHandler = (event) => {
    if (!isDrawing) return;

    const { clientX, clientY } = event;
    const index = elements.length - 1; // Last element of the array
    const { x1, y1 } = elements[index];
    const updatedElement = createElement(x1, y1, clientX, clientY, elementType);

    const copyElementsState = [...elements];
    copyElementsState[index] = updatedElement;
    setElements(copyElementsState);
  };

  ////////////////////////////////////////////////////////////////////////////////////

  const mouseUpHandler = () => {
    setIsDrawing(false);
  };

  ////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <div className="container-buttons">
        <StyleButtons
          type={"radio"}
          id={"line"}
          checked={elementType === "line"}
          onChange={() => setElementType("line")}
        />
        <StyleButtons
          type={"radio"}
          id={"rectangle"}
          checked={elementType === "rectangle"}
          onChange={() => setElementType("rectangle")}
        />
      </div>
      <canvas
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={mouseDownHandler}
        onMouseMove={mouseMoveHandler}
        onMouseUp={mouseUpHandler}
      ></canvas>
    </div>
  );
};

export default Canvas;
