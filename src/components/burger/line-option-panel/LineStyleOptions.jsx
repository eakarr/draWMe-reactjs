import { useContext } from "react";
import { StyleOptionsContext } from "../../../context/StyleOptionsContext";

import { lineColorsTypes } from "../../../helpers/lineColorsTypes";

const LineStyleOptions = () => {
  const {
    lineStrokeWidth,
    setLineStrokeWidth,
    lineRoughness,
    setLineRoughness,
    lineBowing,
    setLineBowing,
    lineStrokeColor,
    setLineStrokeColor,
  } = useContext(StyleOptionsContext);

  const lineStylingTypes = [
    {
      id: "Stroke Width",
      value: lineStrokeWidth,
      onChange: (event) => {
        setLineStrokeWidth(event.target.value);
      },
    },
    {
      id: "Roughness",
      value: lineRoughness,
      onChange: (event) => {
        setLineRoughness(event.target.value);
      },
    },
    {
      id: "Bowing",
      value: lineBowing,
      onChange: (event) => {
        setLineBowing(event.target.value);
      },
    },
  ];

  return (
    <div className="styling-panel--container position-fixed">
      {lineStylingTypes.map((type) => (
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
        <label htmlFor="Stroke Colors">Stroke Colors</label>
        <div className="styling-panel--colors_wrapper flex flex-jbetween flex-acenter">
          {lineColorsTypes.map((color) => (
            <div
              key={color.id}
              style={{ background: color.colorType }}
              onClick={() => setLineStrokeColor(color.colorType)}
              className={
                lineStrokeColor === color.id
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

export default LineStyleOptions;
