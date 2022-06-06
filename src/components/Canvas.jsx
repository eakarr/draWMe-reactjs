import { useEffect, useLayoutEffect, useState } from "react";
import { useHistory } from "../hooks/useHistory";
import rough from "roughjs/bundled/rough.esm";
import getStroke from "perfect-freehand";
import StyleButtons from "./StyleButtons";

import createElement from "../helpers/createElement";
import distanceCalculater from "../helpers/distanceCalculater";
import cursorChangerForPositions from "../helpers/cursorChangerForPositions";
import adjustElementCoordinates from "../helpers/adjustElementCoordinates";
import resizedCoordinates from "../helpers/resizedCoordinates";

import "./Canvas.scss";
import styledButtonTypes from "../helpers/styledButtonTypes";
import RedoUndoButtons from "./RedoUndoButtons";

// nearPoint function allows us to capturing the points of the drawing with an offset like < 5.
const nearPoint = (x, y, x1, y1, name) => {
  return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null; // We are giving some offset so that we can easily click on the line.
};

const onLine = (x1, y1, x2, y2, x, y, maxDistance = 1) => {
  const a = { x: x1, y: y1 };
  const b = { x: x2, y: y2 };
  const c = { x, y };
  const offset =
    distanceCalculater(a, b) -
    (distanceCalculater(a, c) + distanceCalculater(b, c));
  return Math.abs(offset) < maxDistance ? "inside" : null; // We are giving some offset so that we can easily click on the line.
};

// isWithinElement function allows us to get the point where we clicked between the max min values of x and y.
const positionWithinElement = (x, y, element) => {
  const { type, x1, x2, y1, y2 } = element;
  switch (type) {
    case "line":
      // This is for capturing the line
      const on = onLine(x1, y1, x2, y2, x, y);
      const start = nearPoint(x, y, x1, y1, "start");
      const end = nearPoint(x, y, x2, y2, "end");
      return start || end || on;
    case "rectangle":
      // This is for capturing the rectangle
      const topLeft = nearPoint(x, y, x1, y1, "topLeft");
      const topRight = nearPoint(x, y, x2, y1, "topRight");
      const bottomLeft = nearPoint(x, y, x1, y2, "bottomLeft");
      const bottomRight = nearPoint(x, y, x2, y2, "bottomRight");
      const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
      return topLeft || topRight || bottomLeft || bottomRight || inside;
    case "pencil":
      const betweenAnyPoint = element.points.some((point, index) => {
        const nextPoint = element.points[index + 1];
        if (!nextPoint) return false;
        return (
          onLine(point.x, point.y, nextPoint.x, nextPoint.y, x, y, 5) != null
        );
      });
      return betweenAnyPoint ? "inside" : null; // We don't need the start and end points because the resize function won't be implemented on free hand skecth.
    default:
      throw new Error(`Type is not recognised: ${type}`);
  }
};

const getElementAtPosition = (x, y, elements) => {
  return elements
    .map((element) => ({
      ...element,
      position: positionWithinElement(x, y, element),
    }))
    .find((element) => element.position !== null);
}

const getSvgPathFromStroke = (stroke) => {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
};

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
    default:
      throw new Error(`Type is not recognised: ${element.type}`);
  }
};

// If the type selected either line or rectangle then adjustment is required.
const adjustmentRequired = (type) => {
  ["line", "rectangle"].includes(type);
};

const Canvas = () => {
  const [elements, setElements, undo, redo] = useHistory([]);
  const [action, setAction] = useState("none");
  const [toolType, setToolType] = useState("pencil");
  const [selectedElement, setSelectedElement] = useState(null);

  ////////////////////////////////////////////////////////////////////////////////////

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height); // This cleans the previous draws. (x:0, y:0, canvas width, canvas height)

    const roughCanvas = rough.canvas(canvas); // Initializing the RoughJS

    elements.forEach((element) => drawElement(roughCanvas, context, element));
  }, [elements]);

  // This is for setting the ctrl-z / ctrl-y commands.
  useEffect(() => {
    const undoRedoFunction = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "z") {
        undo();
      }
      if ((event.metaKey || event.ctrlKey) && event.key === "y") {
        redo();
      }
    };

    document.addEventListener("keydown", undoRedoFunction);

    return () => {
      document.removeEventListener("keydown", undoRedoFunction);
    };
  }, [undo, redo]);

  // updateElement function allows us to update the x and y coodinates for moving elements.
  const updateElement = (id, x1, y1, x2, y2, type) => {
    const copyElementsState = [...elements];

    switch (type) {
      case "line":
      case "rectangle":
        copyElementsState[id] = createElement(id, x1, y1, x2, y2, type); // updating the element.
        break;
      case "pencil":
        copyElementsState[id].points = [
          ...copyElementsState[id].points,
          { x: x2, y: y2 },
        ];
        break;
      default:
        throw new Error(`Type is not recognised: ${type}`);
    }

    setElements(copyElementsState, true);
  };

  ////////////////////////////////////////////////////////////////////////////////////

  const mouseDownHandler = (event) => {
    const { clientX, clientY } = event;
    if (toolType === "selection") {
      const element = getElementAtPosition(clientX, clientY, elements);
      if (element) {
        if (element.type === "pencil") {
          const xOffsets = element.points.map((point) => clientX - point.x);
          const yOffsets = element.points.map((point) => clientY - point.y);
          setSelectedElement({ ...element, xOffsets, yOffsets });
        } else {
          const offsetX = clientX - element.x1; // Need them to stop jumping coordinates when we select the item.
          const offsetY = clientY - element.y1; // Need them to stop jumping coordinates when we select the item.
          setSelectedElement({ ...element, offsetX, offsetY });
        }
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
      const element = createElement(
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
      if (selectedElement.type === "pencil") {
        const newPoints = selectedElement.points.map((_, index) => ({
          x: clientX - selectedElement.xOffsets[index],
          y: clientY - selectedElement.yOffsets[index],
        }));
        // These three lines are kinda same as updateElement function but slightly different so it is better to update pencil points in this place.
        const copyElementsState = [...elements];
        copyElementsState[selectedElement.id] = {
          ...copyElementsState[selectedElement.id],
          points: newPoints,
        };
        setElements(copyElementsState, true);
      } else {
        const { id, x1, y1, x2, y2, type, offsetX, offsetY } = selectedElement;
        const width = x2 - x1;
        const height = y2 - y1;
        const newX1 = clientX - offsetX;
        const newY1 = clientY - offsetY;
        updateElement(id, newX1, newY1, newX1 + width, newY1 + height, type);
      }
    } else if (action === "resizing") {
      const { id, type, position, ...coordinates } = selectedElement;
      const { x1, y1, x2, y2 } = resizedCoordinates(
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
      if (
        (action === "drawing" || action === "resizing") &&
        adjustmentRequired(type)
      ) {
        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]); //If the adjustment is required then it will update the elements in place and adjust the coordinates. It is not required for the pencil tool.
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
