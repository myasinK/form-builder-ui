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

  const rows = responses[0];
  const columns = responses.length > 1 ? responses[1] : null;

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
          <div className={"config-options rows"}>
            <label className={"config"}>
              {"Require a response"}
              <input type={"checkbox"} className={"require-response"} />
            </label>
            {rows.componentList.map((rowElement, index) => {
              return (
                <>
                  <label className={"config"}>
                    {"Minimum numeric value: "}
                    <input type="number" className={"minimum-num-value"} />
                  </label>
                  <label className={"config"}>
                    {"Maximum numeric value: "}
                    <input type="number" className={"maximum-num-value"} />
                  </label>
                  <label className={"config"}>
                    {"Minimum character length: "}
                    <input type="number" className={"minimum-char-length"} />
                  </label>
                  <label className={"config"}>
                    {"Maximum character length: "}
                    <input type="number" className={"maximum-char-length"} />
                  </label>
                  <label className={"config"}>
                    {"Score value: "}
                    <input className={"score-value"} type="number" />
                  </label>
                </>
              );
            })}
          </div>
          {columns && (
            <div className={"config-options columns"}>
              {columns.componentList.length}
            </div>
          )}
          <div className={"buttons-panel-in-config-view"}>
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
        </div>
      </div>
    </div>
  );
}

export default QuestionView;
