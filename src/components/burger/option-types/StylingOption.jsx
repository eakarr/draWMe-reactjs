import React from "react";

const StylingOption = (props) => {
  const { id, value, onChange } = props;
  return (
    <div className="styling-panel--option_wrapper flex flex-jbetween flex-acenter">
      <label htmlFor={id}>{id}</label>
      <div className="styling-panel--option_wrapper--range flex flex-jend">
        <input
          type="range"
          min={1}
          max={100}
          value={value}
          onChange={onChange}
        />
        <span>{value}</span>
      </div>
    </div>
  );
};

export default StylingOption;
