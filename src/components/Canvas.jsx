import { useEffect, useLayoutEffect, useState } from "react";
import { useHistory } from "../hooks/useHistory";
import rough from "roughjs/bundled/rough.esm";
import StyleButtons from "./StyleButtons";

import elementGenerator from "../helpers/elementGenerator";
import distanceCalculater from "../helpers/distanceCalculater";
import cursorChangerForPositions from "../helpers/cursorChangerForPositions";
import adjustElementCoordinates from "../helpers/adjustElementCoordinates";
import resizedCoodinates from "../helpers/resizedCoordinates";

import "./Canvas.scss";
import styledButtonTypes from "../helpers/styledButtonTypes";
import RedoUndoButtons from "./RedoUndoButtons";

// nearPoint function allows us to capturing the points of the drawing with an offset like < 5.
const nearPoint = (x, y, x1, y1, name) => {
  return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null; // We are giving some offset so that we can easily click on the line.
};

// isWithinElement function allows us to get the point where we clicked between the max min values of x and y.
const positionWithinElement = (x, y, element) => {
  const { type, x1, x2, y1, y2 } = element;
  if (type === "rectangle") {
    // This is for capturing the rectangle
    const topLeft = nearPoint(x, y, x1, y1, "topLeft");
    const topRight = nearPoint(x, y, x2, y1, "topRight");
    const bottomLeft = nearPoint(x, y, x1, y2, "bottomLeft");
    const bottomRight = nearPoint(x, y, x2, y2, "bottomRight");
    const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
    return topLeft || topRight || bottomLeft || bottomRight || inside;
  } else {
    // This is for capturing the line
    const a = { x: x1, y: y1 };
    const b = { x: x2, y: y2 };
    const c = { x, y };
    const offset =
      distanceCalculater(a, b) -
      (distanceCalculater(a, c) + distanceCalculater(b, c));
    const start = nearPoint(x, y, x1, y1, "start");
    const end = nearPoint(x, y, x2, y2, "end");
    const inside = Math.abs(offset) < 1 ? "inside" : null; // We are giving some offset so that we can easily click on the line.
    return start || end || inside;
  }
};

function getElementAtPosition(x, y, elements) {
  return elements
    .map((element) => ({
      ...element,
      position: positionWithinElement(x, y, element),
    }))
    .find((element) => element.position !== null);
}

const Canvas = () => {
  const [elements, setElements, undo, redo] = useHistory([]);
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

  // This is for setting the ctrl-z / ctrl-y commands.
  useEffect(() => {
    const undoRedoFunction = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "z") {
        undo()
      }
      if ((event.metaKey || event.ctrlKey) && event.key === "y") {
        redo()
      }
    };

    document.addEventListener("keydown", undoRedoFunction);

    return () => {
      document.removeEventListener("keydown", undoRedoFunction);
    };
  }, [undo, redo]);

  // updateElement function allows us to update the x and y coodinates for moving elements.
  const updateElement = (id, x1, y1, x2, y2, type) => {
    const updatedElement = elementGenerator(id, x1, y1, x2, y2, type);

    const copyElementsState = [...elements];
    copyElementsState[id] = updatedElement;
    setElements(copyElementsState, true);
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
        setElements((prevState) => prevState); // Need this to fix redo-undo logic. Taking the prevState snapshots.

        // This makes us sure that if the cursor inside of the drawing, the drawing is moving, if it is on the corners, the drawing is resizing.
        if (element.position === "inside") {
          setAction("moving");
        } else {
          setAction("resizing");
        }
      }
    } else {
      const id = elements.length;
      const element = elementGenerator(
        id,
        clientX,
        clientY,
        clientX,
        clientY,
        toolType
      );
      setElements((prevState) => [...prevState, element]);
      setSelectedElement(element);

      setAction("drawing");
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////

  const mouseMoveHandler = (event) => {
    const { clientX, clientY } = event;

    // Changing the cursor while moving an element.
    if (toolType === "selection") {
      const element = getElementAtPosition(clientX, clientY, elements);
      event.target.style.cursor = element
        ? cursorChangerForPositions(element.position)
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
    } else if (action === "resizing") {
      const { id, type, position, ...coordinates } = selectedElement;
      const { x1, y1, x2, y2 } = resizedCoodinates(
        clientX,
        clientY,
        position,
        coordinates
      );
      updateElement(id, x1, y1, x2, y2, type);
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////

  const mouseUpHandler = () => {
    if (selectedElement) {
      const index = selectedElement.id;
      const { id, type } = elements[index];
      if (action === "drawing" || action === "resizing") {
        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
        updateElement(id, x1, y1, x2, y2, type);
      }
    }
    setAction("none");
    setSelectedElement(null);
  };

  ////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <div className="container-style-buttons">
        {styledButtonTypes.map((button) => (
          <StyleButtons
            key={button.id}
            toolType={toolType}
            src={button.icon}
            id={button.id}
            onClick={() => setToolType(button.id)}
          />
        ))}
      </div>
      <div className="container-undo-redo-buttons">
        <RedoUndoButtons undo={undo} redo={redo} />
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
