import React from "react";

function Header1({ primaryElement }) {
  return (
    <h1 className={primaryElement.htmlClassAttr} id={primaryElement.id}>
      {primaryElement.htmlInnerText}
    </h1>
  );
}

export default Header1;
