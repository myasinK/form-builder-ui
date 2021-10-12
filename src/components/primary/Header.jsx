import React from "react";

function Header({ primaryElement, headerType = 1 }) {
  const {
    htmlInnerText = "",
    htmlClassAttr = "class-not-specified",
    id,
  } = primaryElement;
  if (headerType === 1) {
    return (
      <h1 className={htmlClassAttr} id={id}>
        {htmlInnerText}
      </h1>
    );
  } else if (headerType === 2) {
    return (
      <h2 className={htmlClassAttr} id={id}>
        {htmlInnerText}
      </h2>
    );
  } else if (headerType === 3) {
    return (
      <h3 className={htmlClassAttr} id={id}>
        {htmlInnerText}
      </h3>
    );
  } else if (headerType === 4) {
    return (
      <h4 className={htmlClassAttr} id={id}>
        {htmlInnerText}
      </h4>
    );
  } else if (headerType === 5) {
    return (
      <h5 className={htmlClassAttr} id={id}>
        {htmlInnerText}
      </h5>
    );
  } else if (headerType === 6) {
    return (
      <h6 className={htmlClassAttr} id={id}>
        {htmlInnerText}
      </h6>
    );
  } else {
    return <div className={"header error"}>Invalid header type</div>;
  }
}

export default Header;
