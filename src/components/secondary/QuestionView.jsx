import React, { useState } from "react";
import { WrappedEditableObj } from "./EditableData";
import ResponsesContainer from "./ResponsesContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCog } from "@fortawesome/free-solid-svg-icons";

function QuestionView({ questionObject, lastClickedOnId, handlers }) {
  let [isOnAdvancedView, setIsOnAdvancedView] = useState(false);
  const { id = null } = questionObject;

  const [prompt, ...responses] = questionObject.componentList; // responses is going to be an array
  const className = isOnAdvancedView
    ? "question-container hover"
    : "question-container";
  const handleAdvancedToggle = () => {
    setIsOnAdvancedView(!isOnAdvancedView);
  };

  return (
    <div className={className}>
      <div className={"question"}>
        <div className="question-front">
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
              onClick={() => handleAdvancedToggle()}
            />
          </div>
          <FontAwesomeIcon
            className="settings-icon"
            icon={faCog}
            onClick={() => handleAdvancedToggle()}
          />
          <FontAwesomeIcon
            className={"delete-question"}
            onClick={() => handlers.delete(id)}
            icon={faTrashAlt}
          />
        </div>
        <div className="question-back">
          Advanced Settings
          <FontAwesomeIcon
            className="settings-icon"
            icon={faCog}
            onClick={() => handleAdvancedToggle()}
          />
        </div>
      </div>
    </div>
  );
}

export default QuestionView;
