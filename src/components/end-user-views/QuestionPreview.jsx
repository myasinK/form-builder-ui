import React from "react";
import ResponsesContainer from "../secondary/ResponsesContainer";
import Paragraph from "../primary/Paragraph";
import ResponsesPreviewContainer from "./ResponsesPreviewContainer";

function QuestionPreview({ questionObject, handlers }) {
  const [prompt, ...responses] = questionObject.componentList;
  // responses is going to be an array

  return (
    <div className={"question-preview-container"}>
      <div className={"prompt-preview-container"}>
        <Paragraph primaryElement={prompt} />
      </div>
      <div className={"responses-preview-container"}>
        <ResponsesPreviewContainer responses={responses} handlers={handlers} />
      </div>
    </div>
  );
}

export default QuestionPreview;
