import React from "react";

export default function Div({ primaryElement, handlers }) {
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
