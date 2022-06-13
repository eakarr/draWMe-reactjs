import { useState, createContext } from "react";

export const StyleOptionsContext = createContext();

export const StyleOptionsProvider = ({ children }) => {
  const [pencilSize, setPencilSize] = useState(0.16);
  const [pencilThinning, setPencilThinning] = useState(0.5);
  const [pencilStreamline, setPencilStreamline] = useState(0.5);
  const [pencilSmoothing, setPencilSmoothing] = useState(0.5);
  const [pencilTaperStart, setPencilTaperStart] = useState(0.5);
  const [pencilTaperEnd, setPencilTaperEnd] = useState(0.5);

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
      }}
    >
      {children}
    </StyleOptionsContext.Provider>
  );
};
