import React from "react";
import { WrappedEditableObj } from "./EditableData";
import ResponsesContainer from "./ResponsesContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

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
      <FontAwesomeIcon
        className={"delete-question"}
        onClick={() => handlers.delete(id)}
        icon={faTrashAlt}
      />
    </div>
  );
}

export default QuestionView;
