import React from "react";
import Input from "../primary/Input";
import EditableData from "./EditableData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import FaLeftRight from "../icons/FaLeftRight";
import FaUpDown from "../icons/FaUpDown";
import cssClassDictionary from "../../model/cssClassDictionary";

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
  } = cssClassDictionary;

  return (
    <div className={TABLECONTAINER}>
      <HeaderRow
        classDictionary={cssClassDictionary}
        lastClickedOnId={lastClickedOnId}
        columns={columns}
        handlers={handlers}
      />
      {rows.componentList.map((el, index) => {
        return (
          <>
            {index === 0 && (
              <RowGutter
                handlers={handlers}
                classDictionary={cssClassDictionary}
                index={index}
              />
            )}
            <div className={`${ROW} ${BODY}`}>
              <RowHeaderCell
                classDictionary={cssClassDictionary}
                rows={rows}
                rowElement={el}
                lastClickedOnId={lastClickedOnId}
                handlers={handlers}
                index={index}
              />
              <DisplayInputCells
                columns={columns}
                classDictionary={cssClassDictionary}
                displayElement={displayElement}
                rowVal={null}
              />
            </div>
            <RowGutter
              handlers={handlers}
              classDictionary={cssClassDictionary}
              index={index + 1}
            />
          </>
        );
      })}
    </div>
  );
}

const RowHeaderCell = ({
  classDictionary,
  handlers,
  lastClickedOnId,
  rows,
  rowElement,
  index,
}) => {
  const {
    ROW,
    GUTTER,
    HEADER,
    CELL,
    MOVEICONCONTAINER,
    TEXTCONTAINER,
    DELETEICON,
    DELETEICONCONTAINER,
  } = classDictionary;
  return (
    <div className={`${ROW} ${HEADER} ${CELL}`}>
      <div
        className={`${MOVEICONCONTAINER}`}
        draggable={true}
        onDragStart={() => {
          [...document.getElementsByClassName(`${ROW} ${GUTTER}`)].map(
            (el) => (el.style.visibility = "visible")
          );
          handlers.handleDragStart(index, rows.id);
        }}
        onDragEnd={(event) => {
          event.preventDefault();
          [...document.getElementsByClassName(`${ROW} ${GUTTER}`)].map(
            (el) => (el.style.visibility = "hidden")
          );
        }}
      >
        <FaUpDown />
      </div>
      <div className={`${ROW} ${HEADER} ${TEXTCONTAINER}`}>
        <EditableData
          primaryElement={rowElement}
          lastClickedOnId={lastClickedOnId}
          handlers={handlers}
        />
      </div>
      <div className={`${DELETEICONCONTAINER}`}>
        <FontAwesomeIcon
          onClick={() => handlers.delete(rowElement.id)}
          className={`${ROW} ${DELETEICON}`}
          icon={faMinusCircle}
        />
      </div>
    </div>
  );
};

const DisplayInputCells = ({
  columns,
  classDictionary,
  displayElement,
  rowVal, // not doing anything with it yet
}) => {
  const { COLUMN, GUTTER, USERINIPUT, CELL } = classDictionary;
  return columns.componentList.map((el, index) => {
    return (
      <>
        {index === 0 && <div className={`${COLUMN} ${GUTTER}`}></div>}
        <div className={`${USERINIPUT} ${CELL}`}>
          <Input primaryElement={displayElement} disabled={true} />
        </div>
        <div className={`${COLUMN} ${GUTTER}`}></div>
      </>
    );
  });
};

const RowGutter = ({ handlers, classDictionary, index }) => {
  const { ROW, GUTTER } = classDictionary;
  return (
    <div
      onDrop={(event) => handlers.handleOnDrop(event, index)}
      onDragOver={(event) => handlers.handleOnDragOver(event)}
      className={`${ROW} ${GUTTER}`}
    ></div>
  );
};

const HeaderRow = ({ classDictionary, handlers, columns, lastClickedOnId }) => {
  const {
    HEADER,
    ROW,
    BLANK,
    CELL,
    COLUMN,
    GUTTER,
    MOVEICONCONTAINER,
    TEXTCONTAINER,
    DELETEICONCONTAINER,
    DELETEICON,
  } = classDictionary;
  return (
    <div className={`${HEADER} ${ROW}`}>
      <div className={`${BLANK} ${CELL} ${COLUMN} ${HEADER}`}></div>
      {columns.componentList.map((el, index) => {
        return (
          <>
            {index === 0 && (
              <div
                onDrop={(event) => handlers.handleOnDrop(event, index)}
                onDragOver={(event) => handlers.handleOnDragOver(event)}
                className={`${GUTTER} ${COLUMN}`}
              ></div>
            )}
            <div className={`${COLUMN} ${CELL} ${HEADER}`}>
              <div
                className={`${COLUMN} ${MOVEICONCONTAINER}`}
                draggable={true}
                onDragStart={() => {
                  [
                    ...document.getElementsByClassName(`${COLUMN} ${GUTTER}`),
                  ].map((el) => (el.style.visibility = "visible"));
                  handlers.handleDragStart(index, columns.id);
                }}
                onDragEnd={(event) => {
                  event.preventDefault();
                  [
                    ...document.getElementsByClassName(`${COLUMN} ${GUTTER}`),
                  ].map((el) => (el.style.visibility = "hidden"));
                }}
              >
                <FaLeftRight />
              </div>
              <div className={`${COLUMN} ${HEADER} ${TEXTCONTAINER}`}>
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
              onDrop={(event) => handlers.handleOnDrop(event, index + 1)}
              onDragOver={(event) => handlers.handleOnDragOver(event)}
              className={`${GUTTER} ${COLUMN}`}
            ></div>
          </>
        );
      })}
    </div>
  );
};

export default TableAlt;
