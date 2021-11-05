import React, { useState } from "react";
import { WrappedEditableObj } from "./EditableData";
import ResponsesContainer from "./ResponsesContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCog } from "@fortawesome/free-solid-svg-icons";

function QuestionView({ questionObject, lastClickedOnId, handlers }) {
  const { id = null } = questionObject;

  const [prompt, ...responses] = questionObject.componentList;
  // responses is going to be an array

  const handleAdvancedToggle = () => {
    setIsOnAdvancedView(!isOnAdvancedView);
  };

  const rows = responses[0];
  // const { answers } = rows;
  let [isOnAdvancedView, setIsOnAdvancedView] = useState(false);
  const className = isOnAdvancedView
    ? "question-container hover"
    : "question-container";
  let [isShowingCharControls, setIsShowingCharControls] = useState(false); // always hidden by default
  let [isShowingNumControls, setIsShowingNumControls] = useState(false); // always hidden by default
  const { endUserHtmlInputType } = questionObject.componentDescriptor;
  const shouldShowCharControls = endUserHtmlInputType === "text";
  const shouldShowNumControls = endUserHtmlInputType === "number";
  const mayBeScored =
    endUserHtmlInputType === "radio" || endUserHtmlInputType === "checkbox";
  const handleToggleShowNumControls = () => {
    setIsShowingNumControls(!isShowingNumControls);
  };

  const handleToggleShowCharControls = () => {
    setIsShowingCharControls(!isShowingCharControls);
  };

  let [isShowingScoreControls, setIsShowingScoreControls] = useState(
    rows.scored
  ); // always hidden by default
  const handleToggleScoreControls = (targetId) => {
    const updatedScoreToggle = !isShowingScoreControls;
    const instructions = {
      propertyName: "scored",
      propertyValue: updatedScoreToggle,
    };
    setIsShowingScoreControls(updatedScoreToggle);
    handlers.updateNamedMemberWithValue(targetId, instructions);
  };

  const handleChange = (event, targetId, propertyName) => {
    const propertyValue = event.target.value;
    const instructions = {
      propertyName,
      propertyValue,
    };
    handlers.updateNamedMemberWithValue(targetId, instructions);
  };

  const handleOnChangeRequiredCheckbox = (targetId) => {
    const updatedCheckedState = !isRequiredChecked;
    const instructions = {
      propertyName: "isRequired",
      propertyValue: updatedCheckedState,
    };
    handlers.updateNamedMemberWithValue(targetId, instructions);
    setIsRequiredChecked(updatedCheckedState);
  };

  const [isRequiredChecked, setIsRequiredChecked] = useState(rows.isRequired);

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
            />
          </div>
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
        {/* Back face */}
        <div className="question-back">
          Advanced Settings
          <div className={"config-options rows"}>
            <label className={"config"}>
              {"Require a response "}
              <input
                type={"checkbox"}
                className={"require-response"}
                id={"config-require-response"}
                defaultValue={isRequiredChecked}
                onClick={() => handleOnChangeRequiredCheckbox(rows.id)}
              />
            </label>
            {mayBeScored && (
              <label className={"config"}>
                {"Question will need to be scored "}
                <input
                  type={"checkbox"}
                  className={"show-score-controls"}
                  id={"show-score-controls"}
                  value={rows.scored}
                  onClick={() => handleToggleScoreControls(rows.id)}
                />
              </label>
            )}
            {shouldShowCharControls && (
              <label className={"config"}>
                {"Show/hide character controls "}
                <input
                  type={"checkbox"}
                  className={"character-controls"}
                  id={"config-character-controls"}
                  defaultValue={isRequiredChecked}
                  onClick={() => handleToggleShowCharControls()}
                />
              </label>
            )}
            {shouldShowNumControls && (
              <label className={"config"}>
                {"Show/hide numeric controls "}
                <input
                  type={"checkbox"}
                  className={"numeric-controls"}
                  id={"config-numeric-controls"}
                  defaultValue={isRequiredChecked}
                  onClick={() => handleToggleShowNumControls()}
                />
              </label>
            )}
            {rows.componentList.map((rowElement, index) => {
              const targetId = rowElement.id;
              return (
                <>
                  {isShowingNumControls && (
                    <>
                      <label className={"config"}>
                        {"Minimum numeric value: "}
                        <input
                          type="number"
                          className={"minimum-num-value"}
                          onChange={(event) =>
                            handleChange(event, targetId, "minValue")
                          }
                          value={rowElement.minValue}
                        />
                      </label>
                      <label className={"config"}>
                        {"Maximum numeric value: "}
                        <input
                          type="number"
                          className={"maximum-num-value"}
                          onChange={(event) =>
                            handleChange(event, targetId, "maxValue")
                          }
                          value={rowElement.maxValue}
                        />
                      </label>
                    </>
                  )}
                  {isShowingCharControls && (
                    <>
                      <label className={"config"}>
                        {"Minimum character length: "}
                        <input
                          type="number"
                          className={"minimum-char-length"}
                          onChange={(event) =>
                            handleChange(event, targetId, "minCharLength")
                          }
                          value={rowElement.minCharLength}
                        />
                      </label>
                      <label className={"config"}>
                        {"Maximum character length: "}
                        <input
                          type="number"
                          className={"maximum-char-length"}
                          onChange={(event) =>
                            handleChange(event, targetId, "maxCharLength")
                          }
                          value={rowElement.maxCharLength}
                        />
                      </label>
                    </>
                  )}
                  {isShowingScoreControls && (
                    <label className={"config"}>
                      {"Score value: "}
                      <input
                        className={"score-value"}
                        type="number"
                        onChange={(event) =>
                          handlers.handleUpdateNominalScoreValue(
                            event,
                            targetId,
                            "scoreValue"
                          )
                        }
                        value={rowElement.scoreValue}
                      />
                    </label>
                  )}
                </>
              );
            })}
          </div>
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
