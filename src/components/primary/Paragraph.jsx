import React from "react";

function Paragraph({ primaryElement, modClass = null, modId = null }) {
  let { htmlClassAttr, id, htmlInnerText } = primaryElement;
  htmlClassAttr = modClass ? modClass(htmlClassAttr) : htmlClassAttr;
  id = modId ? modId(modId) : id;
  return (
    <p className={htmlClassAttr} id={id}>
      {htmlInnerText}
    </p>
  );
}

export default Paragraph;
