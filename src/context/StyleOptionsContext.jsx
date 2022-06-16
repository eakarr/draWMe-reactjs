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

  return (
    <StyleOptionsContext.Provider
      value={{
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
      }}
    >
      {children}
    </StyleOptionsContext.Provider>
  );
};
