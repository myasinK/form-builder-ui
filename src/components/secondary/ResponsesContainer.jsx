import React from "react";
import InterfaceElement from "../../Interface/InterfaceElement";
import Input from "../primary/Input";
import Span from "../primary/Span";
import Div from "../primary/Div";
import { WrappedEditableObj } from "./EditableData";
import Table from "./Table";
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

  const dragRowElement = new InterfaceElement({
    htmlInnerText: <FontAwesomeIcon icon={faBars} />,
    htmlClassAttr: "response-drag-bar",
    htmlTagName: "span",
    draggable: true,
  }).getElement();

  const dropRowElement = new InterfaceElement({
    htmlInnerText: "",
    htmlClassAttr: "response-drop-area",
    htmlTagName: "span",
    draggable: false,
  }).getElement();

  if (isTabular) {
    return (
      <>
        <div>
          <FontAwesomeIcon
            onClick={() => handlers.addResponse(rows.id)}
            icon={faPlusCircle}
          />
          <span>Row</span>
        </div>
        <div>
          <FontAwesomeIcon
            onClick={() => handlers.addResponse(columns.id)}
            icon={faPlusCircle}
          />
          <span>Column</span>
        </div>
        {/* <Table
          rows={rows}
          columns={columns}
          lastClickedOnId={lastClickedOnId}
          handlers={handlers}
        /> */}
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
          <Input
            disabled={true}
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
                    </div>
                    <FontAwesomeIcon
                      className={"delete-response-row"}
                      onClick={() => handlers.delete(r.id)}
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
                        <Input
                          primaryElement={displayElement}
                          handlers={handlers}
                        />
                      </div>
                      <WrappedEditableObj
                        wrapperClassName={labelClassName}
                        primaryElement={r}
                        lastClickedOnId={lastClickedOnId}
                        handlers={handlers}
                      />
                    </div>

                    <FontAwesomeIcon
                      className={"delete-response-row"}
                      onClick={() => handlers.delete(r.id)}
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
