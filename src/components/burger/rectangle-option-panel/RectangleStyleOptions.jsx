import { useContext } from "react";
import { StyleOptionsContext } from "../../../context/StyleOptionsContext";

import { rectangleColorsTypes } from "../../../helpers/rectangleColorsTypes";

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

  const rectangleStylingTypes = [
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
    <div className="styling-panel--container position-fixed">
      {rectangleStylingTypes.map((type) => (
        <div
          className="styling-panel--option_wrapper flex flex-jbetween flex-acenter"
          key={type.id}
        >
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
          {rectangleColorsTypes.map((color) => (
            <div
              key={color.id}
              style={{ background: color.colorType }}
              onClick={() => setRectangleStrokeColor(color.colorType)}
              className={
                rectangleStrokeColor === color.id
                  ? "styling-panel--colors_wrapper--color active"
                  : "styling-panel--colors_wrapper--color"
              }
            ></div>
          ))}
        </div>
      </div>

      <div className="styling-panel--option_wrapper flex flex-jbetween flex-acenter">
        <label htmlFor="Colors">Fill Color</label>
        <div className="styling-panel--colors_wrapper flex flex-jbetween flex-acenter">
          {rectangleColorsTypes.map((color) => (
            <div
              key={color.id}
              style={{ background: color.colorType }}
              onClick={() => setRectangleFill(color.colorType)}
              className={
                rectangleFill === color.id
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

export default RectangleStyleOptions;
