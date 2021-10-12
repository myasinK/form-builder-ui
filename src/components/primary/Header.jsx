import React from "react";

function Header({ primaryElement }) {
  const {
    htmlInnerText = "",
    htmlClassAttr = "class-not-specified",
    htmlTagName,
    id,
  } = primaryElement;
  if (htmlTagName === "h1") {
    return (
      <h1 className={htmlClassAttr} id={id}>
        {htmlInnerText}
      </h1>
    );
  } else if (htmlTagName === "h2") {
    return (
      <h2 className={htmlClassAttr} id={id}>
        {htmlInnerText}
      </h2>
    );
  } else if (htmlTagName === "h3") {
    return (
      <h3 className={htmlClassAttr} id={id}>
        {htmlInnerText}
      </h3>
    );
  } else if (htmlTagName === "h4") {
    return (
      <h4 className={htmlClassAttr} id={id}>
        {htmlInnerText}
      </h4>
    );
  } else if (htmlTagName === "h5") {
    return (
      <h5 className={htmlClassAttr} id={id}>
        {htmlInnerText}
      </h5>
    );
  } else if (htmlTagName === "h6") {
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
