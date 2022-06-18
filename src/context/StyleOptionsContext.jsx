import { useState, createContext } from "react";

export const StyleOptionsContext = createContext();

export const StyleOptionsProvider = ({ children }) => {
  const [pencilSize, setPencilSize] = useState(16);
  const [pencilThinning, setPencilThinning] = useState(50);
  const [pencilStreamline, setPencilStreamline] = useState(50);
  const [pencilSmoothing, setPencilSmoothing] = useState(50);
  const [pencilTaperStart, setPencilTaperStart] = useState(50);
  const [pencilTaperEnd, setPencilTaperEnd] = useState(50);
  const [pencilColor, setPencilColor] = useState("black");

  const [rectangleStrokeWidth, setRectangleStrokeWidth] = useState(1);
  const [rectangleRoughness, setRectangleRoughness] = useState(1);
  const [rectangleBowing, setRectangleBowing] = useState(1);
  const [rectangleHachureGap, setRectangleHachureGap] = useState(8);
  const [rectangleHachureAngle, setRectangleHachureAngle] = useState(1);
  const [rectangleStrokeColor, setRectangleStrokeColor] = useState("black");
  const [rectangleFill, setRectangleFill] = useState("transparent");

  const [lineStrokeWidth, setLineStrokeWidth] = useState(1);
  const [lineRoughness, setLineRoughness] = useState(1);
  const [lineBowing, setLineBowing] = useState(1);
  const [lineStrokeColor, setLineStrokeColor] = useState("black");

  return (
    <StyleOptionsContext.Provider
      value={{
        //Pencil States
        pencilSize,
        setPencilSize,
        pencilThinning,
        setPencilThinning,
        pencilStreamline,
        setPencilStreamline,
        pencilSmoothing,
        setPencilSmoothing,
        pencilTaperStart,
        setPencilTaperStart,
        pencilTaperEnd,
        setPencilTaperEnd,
        pencilColor,
        setPencilColor,

        //Rectangle States
        rectangleStrokeWidth,
        setRectangleStrokeWidth,
        rectangleRoughness,
        setRectangleRoughness,
        rectangleBowing,
        setRectangleBowing,
        rectangleHachureGap,
        setRectangleHachureGap,
        rectangleHachureAngle,
        setRectangleHachureAngle,
        rectangleStrokeColor,
        setRectangleStrokeColor,
        rectangleFill,
        setRectangleFill,

        //Line States
        lineStrokeWidth,
        setLineStrokeWidth,
        lineRoughness,
        setLineRoughness,
        lineBowing,
        setLineBowing,
        lineStrokeColor,
        setLineStrokeColor,
      }}
    >
      {children}
    </StyleOptionsContext.Provider>
  );
};
