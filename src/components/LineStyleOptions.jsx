import { useContext } from "react";
import { StyleOptionsContext } from "../context/StyleOptionsContext";
import { lineColorsTypes } from "../helpers/lineColorsTypes";

import "./LineStyleOptions.scss";

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
    <div className="line-style-options-container">
      {lineStylingTypes.map((type) => (
        <div className="line-style-options" key={type.id}>
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

      <div className="line-style-options">
        <label htmlFor="Stroke Colors">Stroke Colors</label>
        <div className="line-colors-container">
          {lineColorsTypes.map((color) => (
            <div
              key={color.id}
              style={{ background: color.colorType }}
              onClick={() => setLineStrokeColor(color.colorType)}
              className={
                lineStrokeColor === color.id
                  ? "line-color-box active"
                  : "line-color-box"
              }
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LineStyleOptions;
