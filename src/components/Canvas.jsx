import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useHistory } from "../hooks/useHistory";
import { StyleOptionsContext } from "../context/StyleOptionsContext";
import rough from "roughjs/bundled/rough.esm";
import ToolButtons from "./ToolButtons";

import createElement from "../helpers/createElement";
import getElementAtPosition from "../helpers/getElementAtPosition";
import drawElement from "../helpers/drawElement";
import adjustmentRequired from "../helpers/adjustmentRequired";
import cursorChangerForPositions from "../helpers/cursorChangerForPositions";
import adjustElementCoordinates from "../helpers/adjustElementCoordinates";
import resizedCoordinates from "../helpers/resizedCoordinates";

import "./Canvas.scss";
import styledButtonTypes from "../helpers/styledButtonTypes";
import RedoUndoButtons from "./RedoUndoButtons";
import BurgerButton from "./BurgerButton";
import TrashBinButton from "./TrashBinButton";
import TrashBinModal from "./TrashBinModal";

const Canvas = () => {
  const [elements, setElements, undo, redo] = useHistory([]);
  const [action, setAction] = useState("none");
  const [toolType, setToolType] = useState("pencil");
  const [selectedElement, setSelectedElement] = useState(null);
  const [trashBinModalOpen, setTrashBinModalOpen] = useState(false);
  const textAreaRef = useRef();
  const {
    pencilColor,
    pencilAllStyles,
    rectangleStyleOptions,
    lineStyleOptions,
  } = useContext(StyleOptionsContext);

  ////////////////////////////////////////////////////////////////////////////////////
  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height); // This cleans the previous draws. (x:0, y:0, canvas width, canvas height)

    const roughCanvas = rough.canvas(canvas); // Initializing the RoughJS
    elements.forEach((element) => {
      if (action === "writing" && selectedElement.id === element.id) return;
      drawElement(roughCanvas, context, element);
    });
  }, [elements, action, selectedElement]);

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

  // This is for text area focusing.
  useEffect(() => {
    const textArea = textAreaRef.current;
    if (action === "writing") {
      textArea.focus();
      textArea.value = selectedElement.text;
    }
  }, [action, selectedElement]);

  // updateElement function allows us to update the x and y coodinates for moving elements.
  const updateElement = (
    id,
    x1,
    y1,
    x2,
    y2,
    type,
    options,
    lineStyle,
    rectStyle,
    pencilAllStyles
  ) => {
    const copyElementsState = [...elements];

    switch (type) {
      case "line":
      case "rectangle":
        copyElementsState[id] = createElement(
          id,
          x1,
          y1,
          x2,
          y2,
          type,
          lineStyle,
          rectStyle
        ); // updating the element.
        break;
      case "pencil":
        copyElementsState[id].points = [
          ...copyElementsState[id].points,
          { x: x2, y: y2 },
        ];
        copyElementsState[id].color = pencilColor;
        copyElementsState[id].pencilStyles = pencilAllStyles;
        break;
      case "text":
        // measureText allows us to get the width of the text written.
        const textWidth = document
          .getElementById("canvas")
          .getContext("2d")
          .measureText(options.text).width;
        const textHeight = 24;
        copyElementsState[id] = {
          ...createElement(id, x1, y1, x1 + textWidth, y1 + textHeight, type),
          text: options.text,
        };
        break;
      default:
        throw new Error(`Type not recognised: ${type}`);
    }

    setElements(copyElementsState, true);
  };

  ////////////////////////////////////////////////////////////////////////////////////

  const mouseDownHandler = (event) => {
    if (action === "writing") return;

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
    } else if (toolType === "eraser") {
      if (elements.length === 0) {
        return;
      }
      const element = getElementAtPosition(clientX, clientY, elements);
      if (element) {
        const copyElements = [...elements];
        const selectedDrawing = copyElements[element.id];
        if (element.type === "line") {
          const deletedPointsOfSelectedDrawing = {
            ...selectedDrawing,
            x1: null,
            y1: null,
            x2: null,
            y2: null,
            roughElement: {
              ...selectedDrawing.roughElement,
              sets: [{ ops: [{ data: [], op: "" }], type: "path" }],
            },
          };
          copyElements.splice(element.id, 1, deletedPointsOfSelectedDrawing);
          setElements(copyElements);
        } else if (element.type === "rectangle") {
          const deletedPointsOfSelectedDrawing = {
            ...selectedDrawing,
            x1: null,
            y1: null,
            x2: null,
            y2: null,
            roughElement: {
              ...selectedDrawing.roughElement,
              sets: [
                { ops: [{ data: [], op: "" }], type: "fillSketch" },
                { ops: [{ data: [], op: "" }], type: "path" },
              ],
            },
          };
          copyElements.splice(element.id, 1, deletedPointsOfSelectedDrawing);
          setElements(copyElements);
        } else if (element.type === "pencil") {
          const deletedPointsOfSelectedDrawing = {
            ...selectedDrawing,
            points: [{ x: null, y: null }],
          };
          copyElements.splice(element.id, 1, deletedPointsOfSelectedDrawing);
          setElements(copyElements);
        } else if (element.type === "text") {
          const deletedPointsOfSelectedDrawing = {
            ...selectedDrawing,
            x1: null,
            y1: null,
            x2: null,
            y2: null,
            text: "",
          };
          copyElements.splice(element.id, 1, deletedPointsOfSelectedDrawing);
          setElements(copyElements);
        }
      }
    } else {
      const id = elements.length;
      // The reason that we are sending 2 times clientX and clientY is because when you click, you are creating all of your coordinates. After the creation,  we are updating the second clientX and clientY.
      const element = createElement(
        id,
        clientX,
        clientY,
        clientX,
        clientY,
        toolType,
        lineStyleOptions,
        rectangleStyleOptions,
        pencilColor,
        pencilAllStyles
      );
      setElements((prevState) => [...prevState, element]);
      setSelectedElement(element);

      setAction(toolType === "text" ? "writing" : "drawing");
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
    } else if (toolType === "eraser") {
      const element = getElementAtPosition(clientX, clientY, elements);
      event.target.style.cursor = element
      //"url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAARRJREFUOE/dlDFLxEAQhd+BVouFZ3vlQuwSyI+5a7PBRkk6k9KzTOwStJFsWv0xgaQzkNLWszim0kL2OOFc9oKRYHFTz37Lm/dmJhi5JiPzcBjAOYDz7WheADz3jalP8oIxds85P3Zd90RBqqpad133SUSXAJ5M4H3AhWVZd1EUzYQQP96VZYkkSV7btr02QY1Axtgqz/NTz/OM6qSUCMNwRURneoMJOLdt+7Gu643MfeU4zrppmgt9pibgjRBiWRRFb0R934eUcgngdrfxX4CjSwZj7C3Lsqnu8Lc05XQQBO9ENP2NKapnE5s4jme608rhNE2HxWb7qwr2A+f8SAv2BxFdDQ32rpLRVu9Pl+0wztcg6V/VPW4Vw1FsawAAAABJRU5ErkJggg==') 10 10, auto"
        ? "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAeQAAAHkBOLWIEgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAD3SURBVDiNjdOrTsRAFIfx3zwGy00toABPCGBRPAsJkoAEx3IRvAmOBwCFIlyCAUJC1rCLQgxmJmlm224n+Yv2nO+baXsaYoymrRBCH18xxtFEMcbYGARcIOIHOxM9UwRXCc75xXYnAS4LOGeMrVZB5dhNGWOzVtABzhlho4TPK8UukocqPEg3j7GCzw6C2wyfZbgiXMZHC/yGRTgs4YpkqUHyioU8hO+4afmc/dST4RfMV+pOUmG/RbKXep4xV9QEXKeGgxp4Dd94wmztKCdJHtsjrKfsYohH9GpPV+x2ir/ihd1jpunxQvk7hxB6WE2XwxjjnZb1D1Gfhup67HTYAAAAAElFTkSuQmCC') 10 10, auto"
        : "default";
    }

    if (action === "drawing") {
      const index = elements.length - 1; // Last element of the array
      const { x1, y1, type } = elements[index];
      const lineStyle = type === "line" ? lineStyleOptions : {};
      const rectStyle = type === "rectangle" ? rectangleStyleOptions : {};
      const pencilStyles = type === "pencil" ? pencilAllStyles : {};
      updateElement(
        index,
        x1,
        y1,
        clientX,
        clientY,
        toolType,
        null,
        lineStyle,
        rectStyle,
        pencilStyles
      );
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
        const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement;
        const width = x2 - x1;
        const height = y2 - y1;
        const newX1 = clientX - offsetX;
        const newY1 = clientY - offsetY;
        const options =
          selectedElement.type === "text" ? { text: selectedElement.text } : {};
        const lineStyle =
          selectedElement.type === "line"
            ? selectedElement.roughElement.options
            : {};
        const rectStyle =
          selectedElement.type === "rectangle"
            ? selectedElement.roughElement.options
            : {};
        updateElement(
          id,
          newX1,
          newY1,
          newX1 + width,
          newY1 + height,
          type,
          options,
          lineStyle,
          rectStyle
        );
      }
    } else if (action === "resizing") {
      const { id, type, position, roughElement, ...coordinates } =
        selectedElement;
      const { x1, y1, x2, y2 } = resizedCoordinates(
        clientX,
        clientY,
        position,
        coordinates
      );
      const lineStyle = type === "line" ? roughElement.options : {};
      const rectStyle = type === "rectangle" ? roughElement.options : {};
      updateElement(id, x1, y1, x2, y2, type, null, lineStyle, rectStyle);
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////

  const mouseUpHandler = (event) => {
    const { clientX, clientY } = event;
    if (selectedElement) {
      if (
        selectedElement.type === "text" &&
        clientX - selectedElement.offsetX === selectedElement.x1 &&
        clientY - selectedElement.offsetY === selectedElement.y1
      ) {
        setAction("writing");
        return;
      }

      const index = selectedElement.id;
      const { id, type } = elements[index];
      if (action === "drawing" && adjustmentRequired(type)) {
        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]); //If the adjustment is required then it will update the elements in place and adjust the coordinates. It is not required for the pencil tool.
        const lineStyle = type === "line" ? lineStyleOptions : {};
        const rectStyle = type === "rectangle" ? rectangleStyleOptions : {};
        const pencilStyles = type === "pencil" ? pencilAllStyles : {};
        updateElement(
          id,
          x1,
          y1,
          x2,
          y2,
          type,
          null,
          lineStyle,
          rectStyle,
          pencilStyles
        );
      } else if (action === "resizing" && adjustmentRequired(type)) {
        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]); //If the adjustment is required then it will update the elements in place and adjust the coordinates. It is not required for the pencil tool.
        const lineStyle =
          selectedElement.type === "line"
            ? selectedElement.roughElement.options
            : {};
        const rectStyle =
          selectedElement.type === "rectangle"
            ? selectedElement.roughElement.options
            : {};
        updateElement(id, x1, y1, x2, y2, type, null, lineStyle, rectStyle);
      }
    }

    if (action === "writing") return;

    setAction("none");
    setSelectedElement(null);
  };

  const textAreaOnClickHandler = (event) => {
    const { id, x1, y1, type } = selectedElement;
    setAction("none");
    setSelectedElement(null);
    updateElement(id, x1, y1, null, null, type, { text: event.target.value });
  };

  const trashBinButtonHandler = () => {
    setToolType("eraseAll");
    setTrashBinModalOpen(true);
  };

  ////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <div className="container-style-buttons">
        {styledButtonTypes.map((button) => (
          <ToolButtons
            key={button.id}
            toolType={toolType}
            src={button.icon}
            id={button.id}
            onClick={() => setToolType(button.id)}
          />
        ))}
        <TrashBinButton onClick={trashBinButtonHandler} />
      </div>

      {toolType === "pencil" ? <BurgerButton toolType={toolType} /> : null}
      {toolType === "rectangle" ? <BurgerButton toolType={toolType} /> : null}
      {toolType === "line" ? <BurgerButton toolType={toolType} /> : null}

      <RedoUndoButtons
        className={"container-undo-redo-buttons"}
        undo={undo}
        redo={redo}
      />

      {action === "writing" ? (
        <textarea
          ref={textAreaRef}
          onClick={textAreaOnClickHandler}
          style={{
            position: "fixed",
            top: selectedElement.y1 - 3,
            left: selectedElement.x1,
            font: "24px sans-serif",
            margin: 0,
            padding: 0,
            border: 0,
            outline: 0,
            resize: "auto",
            overflow: "hidden",
            whiteSpace: "pre",
            background: "transparent",
          }}
        />
      ) : null}

      {trashBinModalOpen && (
        <TrashBinModal
          setTrashBinModalOpen={setTrashBinModalOpen}
          setToolType={setToolType}
          setElements={setElements}
        />
      )}

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
