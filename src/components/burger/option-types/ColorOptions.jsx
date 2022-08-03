import React from "react";

const ColorOptions = (props) => {
  const { state, setState, colorTypes, label } = props;
  return (
    <div className="styling-panel--option_wrapper flex flex-jbetween flex-acenter">
      <label htmlFor="Stroke Colors">{label}</label>
      <div className="styling-panel--colors_wrapper flex flex-jbetween flex-acenter">
        {colorTypes.map((color) => (
          <div
            key={color.id}
            style={{ background: color.colorType }}
            onClick={() => setState(color.colorType)}
            className={
              state === color.id
                ? "styling-panel--colors_wrapper--color active"
                : "styling-panel--colors_wrapper--color"
            }
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ColorOptions;
