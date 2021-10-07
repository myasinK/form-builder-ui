import React from "react";
import Div from "../primary/Div";
import Input from "../primary/Input";
import Paragraph from "../primary/Paragraph";

function ElementView({ elementObj, handler1 = null, handler2 = null }) {
  const elementTag = elementObj.htmlTagName;
  switch (elementTag) {
    case "p" || "paragraph":
      return <Paragraph primaryElement={elementObj} />;
    case "div":
      return (
        <Div primaryElement={elementObj} handler1={null} handler2={null} />
      );
    case "input":
      return <Input disabled={false} primaryElement={elementObj}  />;
    case "span":
      break;
    case "button":
      break;

    default:
      break;
  }
}

export default ElementView;
