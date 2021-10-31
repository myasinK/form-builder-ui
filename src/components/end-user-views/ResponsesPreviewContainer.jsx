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

  if (isTabular) {
    return <TablePreview responses={responses} handlers={handlers} />;
  } else {
    if (respondentInputType === "textarea") {
      const answerValue =
        responses[0].answers.length > 0 ? responses[0].answers[0].value : "";
      return (
        <div className={"response-preview-container"}>
          <Input
            disabled={false}
            handlers={handlers}
            primaryElement={displayElement}
            modId={modString(idPrefix, false, true, false)}
            answer={{ value: answerValue }}
            handleOnChangeAnswer={handlers.handleOnChangeTextareaPreview(
              responses[0].id
            )}
          />
        </div>
      );
    } else if (["text"].includes(respondentInputType)) {
      const { answers } = rows;
      return (
        <>
          {rows.componentList.length > 0 &&
            rows.componentList.map((r, index) => {
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
                      <Input
                        primaryElement={displayElement}
                        value={answerValue}
                        handlers={handlers}
                        disabled={false}
                        modId={modString(idPrefix, false, true, false)}
                        handleOnChangeAnswer={handlers.handleOnChangeTextPreview(
                          rows.id
                        )}
                        labelId={r.id}
                      />
                    </div>
                  </div>
                </>
              );
            })}
        </>
      );
    } else if (["radio", "checkbox"].includes(respondentInputType)) {
      const { answers } = rows;
      return (
        <>
          {rows.componentList.length > 0 &&
            rows.componentList.map((r, index) => {
              const answer =
                answers.length > 0 && answers.filter((a) => a.id === r.id)[0];

              const answerValue = answer ? answer.value : "";
              return (
                <div key={r.id} className={"response-preview-container"}>
                  <div className={"response-input-preview-container"}>
                    <Input
                      primaryElement={displayElement}
                      handlers={handlers}
                      disabled={false}
                      modId={modString(idPrefix, false, true, false)}
                      value={answerValue}
                      handleOnChangeAnswer={handlers.handleOnChangeTextPreview(
                        rows.id
                      )}
                      labelId={rows.id}
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
