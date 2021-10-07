import React from "react";
import Paragraph from "../primary/Paragraph";
import EditableData from "./EditableData";

function PromptView({ primaryElement, lastClickedOnId, handlers }) {
  return (
    <>
      <EditableData
        primaryElement={primaryElement}
        PlainTextComponent={Paragraph}
        inputType={"textarea"}
        lastClickedOnId={lastClickedOnId}
        handlers={handlers}
      />
    </>
  );
}

export default PromptView;
