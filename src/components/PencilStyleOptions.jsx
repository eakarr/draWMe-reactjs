import { useContext } from "react";
import { StyleOptionsContext } from "../context/StyleOptionsContext";
import { pencilColorsTypes } from "../helpers/pencilColorsTypes";

import "./PencilStyleOptions.scss";

const PencilStyleOptions = () => {
  const {
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
  } = useContext(StyleOptionsContext);

  return (
    <div className="pencil-style-options-container">
      <div className="pencil-style-options">
        <label htmlFor="Size">Size</label>
        <input
          type="range"
          min={1}
          max={100}
          value={pencilSize}
          onChange={(event) => {
            setPencilSize(event.target.value);
          }}
        />
        <span>{pencilSize}</span>
      </div>
      <div className="pencil-style-options">
        <label htmlFor="Thinning">Thinning</label>
        <input
          type="range"
          min={1}
          max={100}
          value={pencilThinning}
          onChange={(event) => {
            setPencilThinning(event.target.value);
          }}
        />
        <span>{pencilThinning}</span>
      </div>
      <div className="pencil-style-options">
        <label htmlFor="Streamline">Streamline</label>
        <input
          type="range"
          min={1}
          max={100}
          value={pencilStreamline}
          onChange={(event) => {
            setPencilStreamline(event.target.value);
          }}
        />
        <span>{pencilStreamline}</span>
      </div>
      <div className="pencil-style-options">
        <label htmlFor="Smoothing">Smoothing</label>
        <input
          type="range"
          min={1}
          max={100}
          value={pencilSmoothing}
          onChange={(event) => {
            setPencilSmoothing(event.target.value);
          }}
        />
        <span>{pencilThinning}</span>
      </div>
      <div className="pencil-style-options">
        <label htmlFor="Taper Start">Taper Start</label>
        <input
          type="range"
          min={1}
          max={100}
          value={pencilTaperStart}
          onChange={(event) => {
            setPencilTaperStart(event.target.value);
          }}
        />
        <span>{pencilTaperStart}</span>
      </div>
      <div className="pencil-style-options">
        <label htmlFor="Taper End">Taper End</label>
        <input
          type="range"
          min={1}
          max={100}
          value={pencilTaperEnd}
          onChange={(event) => {
            setPencilTaperEnd(event.target.value);
          }}
        />
        <span>{pencilTaperEnd}</span>
      </div>
      <div className="pencil-style-options">
        <label htmlFor="Colors">Colors</label>
        <div className="pencil-colors-container">
          {pencilColorsTypes.map((color) => (
            <div
              key={color.id}
              style={{ background: color.colorType }}
              onClick={() => setPencilColor(color.colorType)}
              className={
                pencilColor === color.id
                  ? "pencil-color-box active"
                  : "pencil-color-box"
              }
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PencilStyleOptions;
