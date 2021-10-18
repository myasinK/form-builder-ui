import React from "react";
import Input from "../primary/Input";
import EditableData from "./EditableData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import FaLeftRight from "../icons/FaLeftRight";
import FaUpDown from "../icons/FaUpDown";

function TableAlt({ responses, handlers, lastClickedOnId }) {
  const rows = responses[0];
  const columns = responses[1];
  const { displayElement } = rows.componentDescriptor;
  // row
  // column
  // cell
  // gutter (prefix/suffix row/column as needed)
  // move-icon-container (prefix/suffix row/column as needed)
  // text-container (prefix/suffix row/column as needed)
  // delete-icon-container (prefix/suffix row/column as needed)
  const classDictionary = {
    TABLECONTAINER: "table-container",
    BLANK: "blank",
    HEADER: "header",
    BODY: "body",
    ROW: "row",
    COLUMN: "column",
    CELL: "cell",
    FIRST: "first",
    GUTTER: "gutter",
    MOVEICONCONTAINER: "move-icon-container",
    TEXTCONTAINER: "text-container",
    DELETEICONCONTAINER: "delete-icon-container",
    DELETEICON: "delete-icon",
    MOVEICON: "move-icon",
    USERINIPUT: "user-input",
  };

  const {
    TABLECONTAINER,
    HEADER,
    ROW,
    COLUMN,
    FIRST,
    BODY,
    CELL,
    GUTTER,
    MOVEICONCONTAINER,
    TEXTCONTAINER,
    DELETEICONCONTAINER,
    BLANK,
    DELETEICON,
    MOVEICON,
    USERINIPUT,
  } = classDictionary;

  return (
    <div className={TABLECONTAINER}>
      <div className={`${HEADER} ${ROW}`}>
        <div className={`${BLANK} ${CELL} ${COLUMN} ${HEADER}`}></div>
        {columns.componentList.map((el, index) => {
          return (
            <>
              {index === 0 && (
                <div
                  onDrop={(event) => handlers.handleOnDrop(event, index)}
                  onDragOver={(event) => handlers.handleOnDragOver(event)}
                  className={`${GUTTER} ${COLUMN} ${CELL}`}
                ></div>
              )}
              <div className={`${COLUMN} ${CELL} ${HEADER}`}>
                <div
                  className={`${COLUMN} ${MOVEICONCONTAINER}`}
                  draggable={true}
                  onDragStart={() => {
                    [
                      ...document.getElementsByClassName(
                        `${COLUMN} ${GUTTER} ${CELL}`
                      ),
                    ].map((el) => (el.style.visibility = "visible"));
                    handlers.handleDragStart(index, columns.id);
                  }}
                  onDragEnd={(event) => {
                    event.preventDefault();
                    [
                      ...document.getElementsByClassName(
                        `${COLUMN} ${GUTTER} ${CELL}`
                      ),
                    ].map((el) => (el.style.visibility = "hidden"));
                  }}
                >
                  <FaLeftRight />
                </div>
                <div className={`${COLUMN} ${HEADER} ${CELL} ${TEXTCONTAINER}`}>
                  <EditableData
                    primaryElement={el}
                    lastClickedOnId={lastClickedOnId}
                    handlers={handlers}
                  />
                </div>
                <div className={`${COLUMN} ${DELETEICONCONTAINER}`}>
                  <FontAwesomeIcon
                    onClick={() => handlers.delete(el.id)}
                    className={`${COLUMN} ${DELETEICON}`}
                    icon={faMinusCircle}
                  />
                </div>
              </div>
              <div
                onDrop={(event) => handlers.handleOnDrop(event, index)}
                onDragOver={(event) => handlers.handleOnDragOver(event)}
                className={`${GUTTER} ${COLUMN} ${CELL}`}
              ></div>
            </>
          );
        })}
      </div>
      {rows.componentList.map((el, index) => {
        return (
          <>
            {index === 0 && (
              <div
                onDrop={(event) => handlers.handleOnDrop(event, index)}
                onDragOver={(event) => handlers.handleOnDragOver(event)}
                className={`${ROW} ${GUTTER}`}
              ></div>
            )}
            <div className={`${ROW} ${BODY}`}>
              <div className={`${ROW} ${HEADER} ${CELL}`}>
                <div
                  className={`${MOVEICONCONTAINER}`}
                  draggable={true}
                  onDragStart={() => {
                    [
                      ...document.getElementsByClassName(`${ROW} ${GUTTER}`),
                    ].map((el) => (el.style.visibility = "visible"));
                    handlers.handleDragStart(index, rows.id);
                  }}
                  onDragEnd={(event) => {
                    event.preventDefault();
                    [
                      ...document.getElementsByClassName(`${ROW} ${GUTTER}`),
                    ].map((el) => (el.style.visibility = "hidden"));
                  }}
                >
                  <FaUpDown />
                </div>
                <div className={`${ROW} ${HEADER} ${CELL} ${TEXTCONTAINER}`}>
                  <EditableData
                    primaryElement={el}
                    lastClickedOnId={lastClickedOnId}
                    handlers={handlers}
                  />
                </div>
                <div className={`${DELETEICONCONTAINER}`}>
                  <FontAwesomeIcon
                    onClick={() => handlers.delete(el.id)}
                    className={`${ROW} ${DELETEICON}`}
                    icon={faMinusCircle}
                  />
                </div>
              </div>
              {columns.componentList.map((el, index) => {
                return (
                  <>
                    {index === 0 && (
                      <div className={`${COLUMN} ${GUTTER} ${CELL}`}></div>
                    )}
                    <div className={`${USERINIPUT} ${CELL}`}>
                      <Input primaryElement={displayElement} disabled={true} />
                    </div>
                    <div className={`${COLUMN} ${GUTTER} ${CELL}`}></div>
                  </>
                );
              })}
            </div>
            <div
              onDrop={(event) => handlers.handleOnDrop(event, index)}
              onDragOver={(event) => handlers.handleOnDragOver(event)}
              className={`${ROW} ${GUTTER}`}
            ></div>
          </>
        );
      })}
    </div>
  );
}

export default TableAlt;
