import React from "react";
import Paragraph from "../primary/Paragraph";
import ResponsesPreviewContainer from "./ResponsesPreviewContainer";
import modString from "../../helpers/modString";

function QuestionPreview({ questionObject, handlers }) {
  const [prompt, ...responses] = questionObject.componentList;
  const idPrefix = "preview-";
  return (
    <div className={"question-preview-container"}>
      <div className={"prompt-preview-container"}>
        <Paragraph
          primaryElement={prompt}
          modId={modString(idPrefix, false, true, false)}
        />
      </div>
      <div className={"responses-preview-container"}>
        <ResponsesPreviewContainer
          responses={responses}
          handlers={handlers}
          questionId={questionObject.id}
        />
      </div>
    </div>
  );
}

export default QuestionPreview;
