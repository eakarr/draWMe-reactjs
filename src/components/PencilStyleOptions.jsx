import { useContext } from "react";
import { StyleOptionsContext } from "../context/StyleOptionsContext";

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
    setPencilTaperEnd
  } = useContext(StyleOptionsContext);

  const pencilStylingFeatures = [
    {
      id: "Size",
      labelName: "Size",
      featureType: pencilSize,
      setFeatureType: setPencilSize,
    },
    {
      id: "Thinning",
      labelName: "Thinning",
      featureType: pencilThinning,
      setFeatureType: setPencilThinning,
    },
    {
      id: "Streamline",
      labelName: "Streamline",
      featureType: pencilStreamline,
      setFeatureType: setPencilStreamline,
    },
    {
      id: "Smoothing",
      labelName: "Smoothing",
      featureType: pencilSmoothing,
      setFeatureType: setPencilSmoothing,
    },
    {
      id: "Taper Start",
      labelName: "Taper Start",
      featureType: pencilTaperStart,
      setFeatureType: setPencilTaperStart,
    },
    {
      id: "Taper End",
      labelName: "Taper End",
      featureType: pencilTaperEnd,
      setFeatureType: setPencilTaperEnd,
    },
  ];

  const increaseSizeButtonHandler = (pencilStyleType, setPencilStyleType) => {
    if (pencilStyleType <= 0.98) {
      setPencilStyleType((prevState) => prevState + 0.02);
    }
    return;
  };

  const decreaseSizeButtonHandler = (pencilStyleType, setPencilStyleType) => {
    if (pencilStyleType >= 0.04) {
      setPencilStyleType((prevState) => prevState - 0.02);
    }
    return;
  };

  return (
    <div className="pencil-style-options-container">
      {pencilStylingFeatures.map((style) => (
        <div className="pencil-style-options" key={Math.random()}>
          <label htmlFor="Size">{style.labelName}</label>
          <div className="pencil-style-option-button-container">
            <button
              onClick={() =>
                increaseSizeButtonHandler(
                  style.featureType,
                  style.setFeatureType
                )
              }
            >
              +
            </button>
            <span>{(style.featureType).toFixed(2)}</span>
            <button
              onClick={() =>
                decreaseSizeButtonHandler(
                  style.featureType,
                  style.setFeatureType
                )
              }
            >
              -
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PencilStyleOptions;
