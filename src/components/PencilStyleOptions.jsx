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

  const pencilStylingTypes = [
    {
      id: "Size",
      value: pencilSize,
      onChange: (event) => {
        setPencilSize(event.target.value);
      },
    },
    {
      id: "Thinning",
      value: pencilThinning,
      onChange: (event) => {
        setPencilThinning(event.target.value);
      },
    },
    {
      id: "Streamline",
      value: pencilStreamline,
      onChange: (event) => {
        setPencilStreamline(event.target.value);
      },
    },
    {
      id: "Smoothing",
      value: pencilSmoothing,
      onChange: (event) => {
        setPencilSmoothing(event.target.value);
      },
    },
    {
      id: "Taper Start",
      value: pencilTaperStart,
      onChange: (event) => {
        setPencilTaperStart(event.target.value);
      },
    },
    {
      id: "Taper End",
      value: pencilTaperEnd,
      onChange: (event) => {
        setPencilTaperEnd(event.target.value);
      },
    },
  ];

  return (
    <div className="pencil-style-options-container">
      {pencilStylingTypes.map((type) => (
        <div className="pencil-style-options" key={type.id}>
          <label htmlFor={type.id}>{type.id}</label>
          <input
            type="range"
            min={1}
            max={100}
            value={type.value}
            onChange={type.onChange}
          />
          <span>{type.value}</span>
        </div>
      ))}

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
