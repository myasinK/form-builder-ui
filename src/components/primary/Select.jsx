import React from "react";
import Option from "./Option";

const Select = ({ handleQuestionPickerChange, optionsArray }) => (
  <select onChange={(event) => handleQuestionPickerChange(event)}>
    {optionsArray.map((option) => (
      <Option innerHTML={option[0]} value={option[1]} />
    ))}
  </select>
);

export default Select;
