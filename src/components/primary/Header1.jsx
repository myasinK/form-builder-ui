import React from "react";

function Header1({ primaryElement }) {
  const {
    htmlInnerText = "",
    htmlClassAttr = "class-not-specified",
    id,
  } = primaryElement;
  return (
    <h1 className={htmlClassAttr} id={id}>
      {htmlInnerText}
    </h1>
  );
}

export default Header1;
