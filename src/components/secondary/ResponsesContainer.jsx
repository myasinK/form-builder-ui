import React from "react";
import InterfaceElement from "../../Interface/InterfaceElement";
import Input from "../primary/Input";
import Span from "../primary/Span";
import { WrappedEditableObj } from "./EditableData";
import Table from "./Table";

function ResponsesContainer({ responses, lastClickedOnId, handlers }) {
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
  const inputModeClassName = "input-mode-container";

  const dragRowElement = new InterfaceElement({
    htmlInnerText: "drag bar (for response objects)",
    htmlClassAttr: "response-drag-bar",
    htmlTagName: "span",
    draggable: true,
  }).getElement();

  const dropRowElement = new InterfaceElement({
    htmlInnerText: "drop area (for response objects)",
    htmlClassAttr: "response-drop-area",
    htmlTagName: "span",
    draggable: false,
  }).getElement();

  if (isTabular) {
    return (
      <>
        <div
          onClick={() => handlers.addResponse(rows.id)}
          className={"options-menu"}
        >
          Add row
        </div>
        <div
          onClick={() => handlers.addResponse(columns.id)}
          className={"options-menu"}
        >
          Add column
        </div>
        <Table
          rows={rows}
          columns={columns}
          lastClickedOnId={lastClickedOnId}
          handlers={handlers}
        />
      </>
    );
  } else {
    if (respondentInputType === "textarea") {
      return (
        <div className={responseContainerClassName}>
          <Input
            disabled={true}
            handlers={handlers}
            primaryElement={displayElement}
          />
        </div>
      );
    } else if (["text", "radio", "checkbox"].includes(respondentInputType)) {
      return (
        <>
          {rows.componentList.length > 0 &&
            rows.componentList.map((r, index) => {
              return (
                <>
                  {index === 0 && (
                    <Span
                      primaryElement={dropRowElement}
                      handlers={handlers}
                      action={"drop"}
                      dragInfo={{ parentId: rows.id, desinationIndex: index }}
                    />
                  )}
                  <div key={r.id} className={responseContainerClassName}>
                    <Span
                      primaryElement={dragRowElement}
                      handlers={handlers}
                      action={"drag"}
                      dragInfo={{ parentId: rows.id, originIndex: index }}
                    />
                    <WrappedEditableObj
                      wrapperClassName={labelClassName}
                      primaryElement={r}
                      lastClickedOnId={lastClickedOnId}
                      handlers={handlers}
                    />
                    <div className={inputModeClassName}>
                      <Input
                        primaryElement={displayElement}
                        handlers={handlers}
                      />
                    </div>
                    <div className={"options-panel"}>
                      <button onClick={() => handlers.delete(r.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                  <Span
                    primaryElement={dropRowElement}
                    handlers={handlers}
                    action={"drop"}
                    dragInfo={{ parentId: rows.id, desinationIndex: index + 1 }}
                  />
                </>
              );
            })}
          <button onClick={() => handlers.addResponse(rows.id)}>
            Add response
          </button>
        </>
      );
    }
  }
}

export default ResponsesContainer;
