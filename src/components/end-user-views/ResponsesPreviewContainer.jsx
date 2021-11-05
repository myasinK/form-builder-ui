import React from "react";
import Input from "../primary/Input";
import Span from "../primary/Span";
import TablePreview from "./TablePreview";
import modString from "../../helpers/modString";

function ResponsesPreviewContainer({ responses, handlers }) {
  let rows,
    columns,
    isTabular,
    componentDescriptor,
    respondentInputType,
    displayElement,
    componentDescriptorRows;

  const idPrefix = "preview-";

  if (responses.length === 1) {
    rows = responses[0];
    componentDescriptor = rows.componentDescriptor;
    isTabular = componentDescriptor.isTabular;
    respondentInputType = componentDescriptor.displayElement.htmlTagName;
    displayElement = Object.assign({}, componentDescriptor.displayElement);
  } else if (responses.length === 2) {
    // i.e. if it's a table
    [rows, columns] = responses;
    componentDescriptorRows = rows.componentDescriptor;
    respondentInputType = componentDescriptorRows.displayElement.htmlTagName;
    isTabular = componentDescriptorRows.isTabular;
    displayElement = Object.assign({}, componentDescriptorRows.displayElement);
  }
  const { answers } = rows;

  if (isTabular) {
    return <TablePreview responses={responses} handlers={handlers} />;
  } else {
    if (respondentInputType === "textarea") {
      const answerValue =
        responses[0].answers.length > 0 ? responses[0].answers[0].value : "";
      return (
        <div className={"response-preview-container"}>
          <textarea
            onChange={(event) =>
              handlers.handleOnChangeTextareaPreview(responses[0].id)(
                event.target.value
              )
            }
            value={answerValue}
          ></textarea>
        </div>
      );
    } else if (
      ["text"].includes(respondentInputType) &&
      rows.componentList.length > 0
    ) {
      return (
        <>
          {rows.componentList.map((r, index) => {
            const answer =
              answers.length > 0 && answers.filter((a) => a.id === r.id)[0];

            const answerValue = answer ? answer.value : "";
            return (
              <>
                <div key={r.id} className={"response-preview-container"}>
                  <div className={"response-label-preview-container"}>
                    <Span
                      primaryElement={r}
                      modId={modString(idPrefix, false, true, false)}
                    />
                  </div>
                  <div className={"response-input-preview-container"}>
                    <input
                      value={answerValue}
                      type={"text"}
                      onChange={(event) =>
                        handlers.handleOnChangeTextPreview(rows.id)({
                          id: r.id,
                          value: event.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </>
            );
          })}
        </>
      );
    } else if (["radio"].includes(respondentInputType)) {
      const { answers } = rows;
      return (
        <>
          {rows.componentList.length > 0 &&
            rows.componentList.map((r, index) => {
              const answer =
                answers.length > 0 && answers.filter((a) => a.id === r.id)[0];
              const name =
                respondentInputType === "radio"
                  ? `answer-${rows.id}`
                  : `answer-${r.id}`;
              const answerValue = answer ? answer.value : false;
              return (
                <div key={r.id} className={"response-preview-container"}>
                  <div className={"response-input-preview-container"}>
                    <input
                      type={respondentInputType}
                      name={name}
                      checked={answerValue}
                      onChange={(event) =>
                        handlers.handleOnChangeRadioPreview(rows.id)({
                          id: r.id,
                          value: event.target.checked,
                        })
                      }
                    />
                  </div>
                  <div className={"response-label-preview-container"}>
                    <Span
                      primaryElement={r}
                      modId={modString(idPrefix, false, true, false)}
                    />
                  </div>
                </div>
              );
            })}
        </>
      );
    } else if (["checkbox"].includes(respondentInputType)) {
      const { answers } = rows;
      return (
        <>
          {rows.componentList.length > 0 &&
            rows.componentList.map((r, index) => {
              const answer =
                answers.length > 0 && answers.filter((a) => a.id === r.id)[0];
              const nameAttributeIfRadioOrCheckbox =
                respondentInputType === "radio"
                  ? `answer-${rows.id}`
                  : `answer-${r.id}`;
              const answerValue = answer ? answer.value : false;
              return (
                <div key={r.id} className={"response-preview-container"}>
                  <div className={"response-input-preview-container"}>
                    <input
                      checked={answerValue}
                      type={respondentInputType}
                      name={nameAttributeIfRadioOrCheckbox}
                      onChange={(event) =>
                        handlers.handleOnChangeCheckboxPreview(rows.id)({
                          id: r.id,
                          value: event.target.checked,
                        })
                      }
                    />
                  </div>
                  <div className={"response-label-preview-container"}>
                    <Span
                      primaryElement={r}
                      modId={modString(idPrefix, false, true, false)}
                    />
                  </div>
                </div>
              );
            })}
        </>
      );
    }
  }
}

export default ResponsesPreviewContainer;
