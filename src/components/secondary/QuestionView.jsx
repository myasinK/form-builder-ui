import React from "react";
import { WrappedEditableObj } from "./EditableData";
import ResponsesContainer from "./ResponsesContainer";

function QuestionView({ questionObject, lastClickedOnId, handlers }) {
  const { id = null } = questionObject;

  const [prompt, ...responses] = questionObject.componentList; // responses is going to be an array

  return (
    <div className={"question-container"}>
      <WrappedEditableObj
        wrapperClassName={"prompt-container"}
        primaryElement={prompt}
        lastClickedOnId={lastClickedOnId}
        handlers={handlers}
      />

      <div className={"responses-container"}>
        <ResponsesContainer
          responses={responses}
          lastClickedOnId={lastClickedOnId}
          handlers={handlers}
        />
      </div>
      <button onClick={() => handlers.delete(id)}>Delete question</button>
    </div>
  );
}

export default QuestionView;
