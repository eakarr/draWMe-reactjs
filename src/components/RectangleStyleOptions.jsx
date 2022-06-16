import { useContext } from "react";
import { StyleOptionsContext } from "../context/StyleOptionsContext";
import { rectangleColorsTypes } from "../helpers/rectangleColorsTypes";

import "./RectangleStyleOptions.scss";

const RectangleStyleOptions = () => {
  const {
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
  } = useContext(StyleOptionsContext);

  const pencilStylingTypes = [
    {
      id: "Stroke Width",
      value: rectangleStrokeWidth,
      onChange: (event) => {
        setRectangleStrokeWidth(event.target.value);
      },
    },
    {
      id: "Roughness",
      value: rectangleRoughness,
      onChange: (event) => {
        setRectangleRoughness(event.target.value);
      },
    },
    {
      id: "Bowing",
      value: rectangleBowing,
      onChange: (event) => {
        setRectangleBowing(event.target.value);
      },
    },
    {
      id: "Hachure Gap",
      value: rectangleHachureGap,
      onChange: (event) => {
        setRectangleHachureGap(event.target.value);
      },
    },
    {
      id: "Hachure Angle",
      value: rectangleHachureAngle,
      onChange: (event) => {
        setRectangleHachureAngle(event.target.value);
      },
    },
  ];

  return (
    <div className="rectangle-style-options-container">
      {pencilStylingTypes.map((type) => (
        <div className="rectangle-style-options" key={type.id}>
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

      <div className="rectangle-style-options">
        <label htmlFor="Stroke Colors">Stroke Colors</label>
        <div className="rectangle-colors-container">
          {rectangleColorsTypes.map((color) => (
            <div
              key={color.id}
              style={{ background: color.colorType }}
              onClick={() => setRectangleStrokeColor(color.colorType)}
              className={
                rectangleStrokeColor === color.id
                  ? "rectangle-color-box active"
                  : "rectangle-color-box"
              }
            ></div>
          ))}
        </div>
      </div>

      <div className="rectangle-style-options">
        <label htmlFor="Colors">Fill Color</label>
        <div className="rectangle-colors-container">
          {rectangleColorsTypes.map((color) => (
            <div
              key={color.id}
              style={{ background: color.colorType }}
              onClick={() => setRectangleFill(color.colorType)}
              className={
                rectangleFill === color.id
                  ? "rectangle-color-box active"
                  : "rectangle-color-box"
              }
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RectangleStyleOptions;
