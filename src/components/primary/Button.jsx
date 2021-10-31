import React from "react";

const Button = ({
  primaryElement,
  onBtnClick,
  isBtnDisabled = false,
  modId = null,
  modClass = null,
}) => {
  let {
    id,
    htmlInnerText = "",
    componentDescriptor = {},
    htmlClassAttr = "class-not-specified",
    htmlNameAttr = "name-not-specified",
  } = primaryElement;

  htmlClassAttr = modClass ? modClass(htmlClassAttr) : htmlClassAttr;
  id = modId ? modId(modId) : id;
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
