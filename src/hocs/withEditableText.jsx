import React from "react";
import Div from "../components/primary/Div";
import Span from "../components/primary/Span";
import Paragraph from "../components/primary/Paragraph";
import Input from "../components/primary/Input";

function withEditable(Static, UserInput, inputType) {
  return function ({ lastClickId, secondToLastClickId, ...props }) {
    props.htmlAttrType = inputType;
    const inEditMode = lastClickId === props.id;
    return (
      <>
        {!inEditMode && <Static {...props} />}
        {inEditMode && <UserInput {...props} />}
      </>
    );
  };
}

export let EditableDivLong = withEditable(Div, Input, "textarea");
export let EditableDiv = withEditable(Div, Input, "text");
export let EditableSpanLong = withEditable(Span, Input, "textarea");
export let EditableSpan = withEditable(Span, Input, "text");
export let EditableParagraphLong = withEditable(Paragraph, Input, "textarea");
export let EditableParagraph = withEditable(Paragraph, Input, "text");
