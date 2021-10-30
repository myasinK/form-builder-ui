import React from "react";
import Input from "../primary/Input";
import Span from "../primary/Span";
import TableAlt from "../secondary/TableAlt";
import TablePreview from "./TablePreview";

function ResponsesPreviewContainer({ responses, handlers }) {
  let rows,
    columns,
    isTabular,
    componentDescriptor,
    respondentInputType,
    displayElement,
    componentDescriptorRows;

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

  const responseContainerClassName = "response-container";
  const labelClassName = "response-label-container";
  let inputModeClassName =
    "input-mode-container " + rows.componentDescriptor.endUserHtmlInputType;

  if (isTabular) {
    return <TablePreview responses={responses} handlers={handlers} />;
  } else {
    if (respondentInputType === "textarea") {
      return (
        <div className={"response-preview-container"}>
          <Input
            disabled={false}
            handlers={handlers}
            primaryElement={displayElement}
          />
        </div>
      );
    } else if (["text"].includes(respondentInputType)) {
      return (
        <>
          {rows.componentList.length > 0 &&
            rows.componentList.map((r, index) => {
              return (
                <>
                  <div key={r.id} className={"response-preview-container"}>
                    <div className={"response-label-preview-container"}>
                      <Span primaryElement={r} />
                    </div>
                    <div className={"response-input-preview-container"}>
                      <Input
                        primaryElement={displayElement}
                        handlers={handlers}
                        disabled={false}
                      />
                    </div>
                  </div>
                </>
              );
            })}
        </>
      );
    } else if (["radio", "checkbox"].includes(respondentInputType)) {
      return (
        <>
          {rows.componentList.length > 0 &&
            rows.componentList.map((r, index) => {
              return (
                <div key={r.id} className={"response-preview-container"}>
                  <div className={"response-input-preview-container"}>
                    <Input
                      primaryElement={displayElement}
                      handlers={handlers}
                      disabled={false}
                    />
                  </div>
                  <div className={"response-label-preview-container"}>
                    <Span primaryElement={r} />
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
