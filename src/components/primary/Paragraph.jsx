import React from "react";

function Paragraph({ primaryElement }) {
  return (
    <p className={primaryElement.htmlClassAttr} id={primaryElement.id}>
      {primaryElement.htmlInnerText}
    </p>
  );
}

export default Paragraph;
