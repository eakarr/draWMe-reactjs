import { useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm";
import StyleButtons from "./StyleButtons";

import "./Canvas.scss";

const elementGenerator = rough.generator();

function createElement(id, x1, y1, x2, y2, type) {
  const roughElement =
    type === "line"
      ? elementGenerator.line(x1, y1, x2, y2)
      : elementGenerator.rectangle(x1, y1, x2 - x1, y2 - y1);
  return { id, x1, y1, x2, y2, type, roughElement };
}

// distance function allows us to calculate the differences between the x,y values.
const distance = (a, b) =>
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

// isWithinElement function allows us to get the point where we clicked between the max min values of x and y.
const isWithinElement = (x, y, element) => {
  const { type, x1, x2, y1, y2 } = element;
  if (type === "rectangle") {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return x >= minX && x <= maxX && y >= minY && y <= maxY;
  } else {
    const a = { x: x1, y: y1 };
    const b = { x: x2, y: y2 };
    const c = { x, y };
    const offset = distance(a, b) - (distance(a, c) + distance(b, c));
    return Math.abs(offset) < 1; // We are giving some offset so that we can easily click on the line.
  }
};

function getElementAtPosition(x, y, elements) {
  return elements.find((element) => isWithinElement(x, y, element));
}

const Canvas = () => {
  const [elements, setElements] = useState([]);
  const [action, setAction] = useState("none");
  const [toolType, setToolType] = useState("line");
  const [selectedElement, setSelectedElement] = useState(null);

  ////////////////////////////////////////////////////////////////////////////////////

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height); // This cleans the previous draws. (x:0, y:0, canvas width, canvas height)

    const roughCanvas = rough.canvas(canvas); // Initializing the RoughJS

    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
  }, [elements]);

  // updateElement function allows us to update the x and y coodinates for moving elements.
  const updateElement = (id, x1, y1, x2, y2, type) => {
    const updatedElement = createElement(id, x1, y1, x2, y2, type);

    const copyElementsState = [...elements];
    copyElementsState[id] = updatedElement;
    setElements(copyElementsState);
  };

  ////////////////////////////////////////////////////////////////////////////////////

  const mouseDownHandler = (event) => {
    const { clientX, clientY } = event;
    if (toolType === "selection") {
      const element = getElementAtPosition(clientX, clientY, elements);
      if (element) {
        const offsetX = clientX - element.x1; // Need them to stop jumping coordinates when we select the item.
        const offsetY = clientY - element.y1; // Need them to stop jumping coordinates when we select the item.
        setSelectedElement({ ...element, offsetX, offsetY });
        setAction("moving");
      }
    } else {
      const id = elements.length;
      const element = createElement(
        id,
        clientX,
        clientY,
        clientX,
        clientY,
        toolType
      );
      setElements((prevState) => [...prevState, element]);

      setAction("drawing");
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////

  const mouseMoveHandler = (event) => {
    const { clientX, clientY } = event;

    // Changing the cursor while moving an element.
    if (toolType === "selection") {
      event.target.style.cursor = getElementAtPosition(
        clientX,
        clientY,
        elements
      )
        ? "move"
        : "default";
    }

    if (action === "drawing") {
      const index = elements.length - 1; // Last element of the array
      const { x1, y1 } = elements[index];
      updateElement(index, x1, y1, clientX, clientY, toolType);
    } else if (action === "moving") {
      const { id, x1, y1, x2, y2, type, offsetX, offsetY } = selectedElement;
      const width = x2 - x1;
      const height = y2 - y1;
      const newX1 = clientX - offsetX;
      const newY1 = clientY - offsetY;
      updateElement(id, newX1, newY1, newX1 + width, newY1 + height, type);
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////

  const mouseUpHandler = () => {
    setAction("none");
    setSelectedElement(null);
  };

  ////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <div className="container-buttons">
        <StyleButtons
          type={"radio"}
          id={"selection"}
          checked={toolType === "selection"}
          onChange={() => setToolType("selection")}
        />
        <StyleButtons
          type={"radio"}
          id={"line"}
          checked={toolType === "line"}
          onChange={() => setToolType("line")}
        />
        <StyleButtons
          type={"radio"}
          id={"rectangle"}
          checked={toolType === "rectangle"}
          onChange={() => setToolType("rectangle")}
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
