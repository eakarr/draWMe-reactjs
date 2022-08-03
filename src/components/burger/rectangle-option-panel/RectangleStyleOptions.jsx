import { useContext } from "react";
import { StyleOptionsContext } from "../../../context/StyleOptionsContext";

import { rectangleColorsTypes } from "../../../helpers/rectangleColorsTypes";
import ColorOptions from "../option-types/ColorOptions";
import StylingOption from "../option-types/StylingOption";

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
        <div key={type.id}>
          <StylingOption
            id={type.id}
            value={type.value}
            onChange={type.onChange}
          />
        </div>
      ))}

      <ColorOptions
        state={rectangleStrokeColor}
        setState={setRectangleStrokeColor}
        colorTypes={rectangleColorsTypes}
        label={"Stroke Colors"}
      />

      <ColorOptions
        state={rectangleFill}
        setState={setRectangleFill}
        colorTypes={rectangleColorsTypes}
        label={"Fill Colors"}
      />
    </div>
  );
};

export default RectangleStyleOptions;
