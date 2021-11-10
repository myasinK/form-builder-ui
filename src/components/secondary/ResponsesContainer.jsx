import React from "react";
import InterfaceElement from "../../Interface/InterfaceElement";
import Span from "../primary/Span";
import EditableData from "./EditableData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faPlusCircle,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import TableAlt from "./TableAlt";

function ResponsesContainer({ responses, lastClickedOnId, handlers }) {
  let rows,
    columns,
    isTabular,
    componentDescriptor,
    respondentInputType,
    componentDescriptorRows;

  if (responses.length === 1) {
    rows = responses[0];
    componentDescriptor = rows.componentDescriptor;
    isTabular = componentDescriptor.isTabular;
    respondentInputType = componentDescriptor.displayElement.htmlTagName;
  } else if (responses.length === 2) {
    // i.e. if it's a table
    [rows, columns] = responses;
    componentDescriptorRows = rows.componentDescriptor;
    respondentInputType = componentDescriptorRows.displayElement.htmlTagName;
    isTabular = componentDescriptorRows.isTabular;
  }

  const responseContainerClassName = "response-container";
  let inputModeClassName =
    "input-mode-container " + rows.componentDescriptor.endUserHtmlInputType;

  const dragRowElement = new InterfaceElement({
    htmlInnerText: <FontAwesomeIcon icon={faBars} />,
    htmlClassAttr: "response-drag-bar",
    htmlTagName: "span",
    draggable: true,
  }).getElement();

  if (isTabular) {
    return (
      <>
        <div className={"table add-buttons-container"}>
          <FontAwesomeIcon
            onClick={() => handlers.addResponse(rows.id)}
            icon={faPlusCircle}
            className={"add-icon"}
          />
          <span>Row</span>
          <FontAwesomeIcon
            onClick={() => handlers.addResponse(columns.id)}
            icon={faPlusCircle}
            className={"add-icon"}
          />
          <span>Column</span>
        </div>
        <TableAlt
          responses={responses}
          lastClickedOnId={lastClickedOnId}
          handlers={handlers}
        />
      </>
    );
  } else {
    if (respondentInputType === "textarea") {
      return (
        <div className={responseContainerClassName}>
          <textarea disabled={true}></textarea>
        </div>
      );
    } else if (["text"].includes(respondentInputType)) {
      return (
        <>
          {rows.componentList.length > 0 &&
            rows.componentList.map((r, index) => {
              return (
                <>
                  {index === 0 && (
                    <div
                      className={"response-drop-area"}
                      onDrop={(event) => handlers.handleOnDrop(event, index)}
                      onDragOver={(event) => handlers.handleOnDragOver(event)}
                    ></div>
                  )}
                  <div key={r.id} className={responseContainerClassName}>
                    <Span
                      primaryElement={dragRowElement}
                      handlers={handlers}
                      action={"drag"}
                      dragInfo={{ parentId: rows.id, originIndex: index }}
                    />
                    <div className={"input-and-label-container"}>
                      <div className={"label-container"}>
                        <EditableData
                          primaryElement={r}
                          lastClickedOnId={lastClickedOnId}
                          handlers={handlers}
                        />
                      </div>
                      <div className={inputModeClassName}>
                        <input type="text" disabled={true} />
                      </div>
                    </div>
                    <div className={"delete-response-icon-container"}>
                      <FontAwesomeIcon
                        className={"delete-response-row"}
                        onClick={() => handlers.delete(r.id, rows.id)}
                        icon={faMinusCircle}
                      />
                    </div>
                  </div>
                  <div
                    className={"response-drop-area"}
                    onDrop={(event) => handlers.handleOnDrop(event, index + 1)}
                    onDragOver={(event) => handlers.handleOnDragOver(event)}
                  ></div>
                </>
              );
            })}
          <FontAwesomeIcon
            className={"add-response-row"}
            onClick={() => handlers.addResponse(rows.id)}
            icon={faPlusCircle}
          />
        </>
      );
    } else if (["radio", "checkbox"].includes(respondentInputType)) {
      return (
        <>
          {rows.componentList.length > 0 &&
            rows.componentList.map((r, index) => {
              return (
                <>
                  {index === 0 && (
                    <div
                      className={"response-drop-area"}
                      onDrop={(event) => handlers.handleOnDrop(event, index)}
                      onDragOver={(event) => handlers.handleOnDragOver(event)}
                    ></div>
                  )}
                  <div key={r.id} className={responseContainerClassName}>
                    <Span
                      primaryElement={dragRowElement}
                      handlers={handlers}
                      action={"drag"}
                      dragInfo={{ parentId: rows.id, originIndex: index }}
                    />
                    <div className={"input-and-label-container"}>
                      <div className={inputModeClassName}>
                        <input
                          type={respondentInputType}
                          handlers={null}
                          disabled={true}
                        />
                      </div>
                      <EditableData
                        primaryElement={r}
                        lastClickedOnId={lastClickedOnId}
                        handlers={handlers}
                      />
                    </div>

                    <FontAwesomeIcon
                      className={"delete-response-row"}
                      onClick={() => handlers.delete(r.id, rows.id)}
                      icon={faMinusCircle}
                    />
                  </div>
                  <div
                    className={"response-drop-area"}
                    onDrop={(event) => handlers.handleOnDrop(event, index + 1)}
                    onDragOver={(event) => handlers.handleOnDragOver(event)}
                  ></div>
                </>
              );
            })}
          <FontAwesomeIcon
            className={"add-response-row"}
            onClick={() => handlers.addResponse(rows.id)}
            icon={faPlusCircle}
          />
        </>
      );
    }
  }
}

export default ResponsesContainer;
