import { useContext } from "react";
import { StyleOptionsContext } from "../../../context/StyleOptionsContext";

import { pencilColorsTypes } from "../../../helpers/pencilColorsTypes";

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
    <div className="styling-panel--container position-fixed">
      {pencilStylingTypes.map((type) => (
        <div className="styling-panel--option_wrapper flex flex-jbetween flex-acenter" key={type.id}>
          <label htmlFor={type.id}>{type.id}</label>
          <div className="styling-panel--option_wrapper--range flex flex-jend">
            <input
              type="range"
              min={1}
              max={100}
              value={type.value}
              onChange={type.onChange}
            />
            <span>{type.value}</span>
          </div>
        </div>
      ))}

      <div className="styling-panel--option_wrapper flex flex-jbetween flex-acenter">
        <label htmlFor="Colors">Colors</label>
        <div className="styling-panel--colors_wrapper flex flex-jbetween flex-acenter">
          {pencilColorsTypes.map((color) => (
            <div
              key={color.id}
              style={{ background: color.colorType }}
              onClick={() => setPencilColor(color.colorType)}
              className={
                pencilColor === color.id
                  ? "styling-panel--colors_wrapper--color active"
                  : "styling-panel--colors_wrapper--color"
              }
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PencilStyleOptions;
