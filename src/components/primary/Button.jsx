import React from "react";

const Button = ({ primaryElement, onBtnClick, isBtnDisabled = false }) => {
  const {
    id,
    htmlInnerText = "",
    componentDescriptor = {},
    htmlClassAttr = "class-not-specified",
    htmlNameAttr = "name-not-specified",
  } = primaryElement;
  return (
    <button
      id={id}
      className={htmlClassAttr}
      name={htmlNameAttr}
      disabled={isBtnDisabled}
      onClick={() => onBtnClick(componentDescriptor)}
    >
      {htmlInnerText}
    </button>
  );
};

export default Button;
