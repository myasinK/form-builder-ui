import React from "react";

export default function Div({ primaryElement, handler1, handler2 }) {
  const {
    componentDescriptor = {},
    htmlInnerText = "",
    htmlClassAttr = "class-not-specified",
  } = primaryElement;
  return (
    <div id={primaryElement.id} className={htmlClassAttr}>
      {htmlInnerText}
    </div>
  );
}
