import React from "react";

function Span({ primaryElement, handler1, handler2 }) {
  const {
    htmlInnerText = "",
    htmlClassAttr = "class-not-specified",
    id,
  } = primaryElement;
  return (
    <span className={htmlClassAttr} id={id}>
      {htmlInnerText}
    </span>
  );
}

export default Span;
