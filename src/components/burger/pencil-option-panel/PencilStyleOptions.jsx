import { useContext } from "react";
import { StyleOptionsContext } from "../../../context/StyleOptionsContext";

import { pencilColorsTypes } from "../../../helpers/pencilColorsTypes";
import ColorOptions from "../option-types/ColorOptions";
import StylingOption from "../option-types/StylingOption";

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
        <div key={type.id}>
          <StylingOption
            id={type.id}
            value={type.value}
            onChange={type.onChange}
          />
        </div>
      ))}

      <ColorOptions
        state={pencilColor}
        setState={setPencilColor}
        colorTypes={pencilColorsTypes}
        label={"Colors"}
      />
    </div>
  );
};

export default PencilStyleOptions;
