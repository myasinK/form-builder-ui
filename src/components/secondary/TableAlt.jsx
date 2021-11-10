import React from "react";
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
  const handleMouseEnter = (event, json) => {
    event.preventDefault();
    const { row, column } = json;
    if (row) {
      const nodeListRowCells = document.querySelectorAll(`.cell.${row}`);
      const rowCellsArray = Array.from(nodeListRowCells);
      rowCellsArray.map((r) => (r.className = r.className + " hover"));
    }
    if (column) {
      const nodeListColumnCells = document.querySelectorAll(`.cell.${column}`);
      const columnCellsArray = Array.from(nodeListColumnCells);
      columnCellsArray.map((c) => (c.className = c.className + " hover"));
    }
  };
  const handleMouseLeave = (event, json) => {
    event.preventDefault();
    const { row, column } = json;
    if (row) {
      const nodeListRowCells = document.querySelectorAll(`.cell.${row}`);
      const rowCellsArray = Array.from(nodeListRowCells);
      rowCellsArray.map((c) => {
        const newClassName = c.className.replace(" hover", "");
        c.className = newClassName;
      });
    }
    if (column) {
      const nodeListColumnCells = document.querySelectorAll(`.cell.${column}`);
      const columnCellsArray = Array.from(nodeListColumnCells);
      columnCellsArray.map((c) => {
        const newClassName = c.className.replace(" hover", "");
        c.className = newClassName;
      });
    }
  };

  const { TABLECONTAINER, ROW, BODY } = cssClassDictionary;

  return (
    <div className={TABLECONTAINER}>
      <HeaderRow
        classDictionary={cssClassDictionary}
        lastClickedOnId={lastClickedOnId}
        columns={columns}
        handlers={handlers}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
      {rows.componentList.map((el, index) => {
        const rowElementId = el.id;
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
                rowElementId={rowElementId}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
              />
              <DisplayInputCells
                columns={columns}
                classDictionary={cssClassDictionary}
                displayElement={displayElement}
                rowVal={null}
                rowElementId={rowElementId}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
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
  handleMouseEnter,
  handleMouseLeave,
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
    <div
      className={`${ROW} ${HEADER} ${CELL} ${rowElement.id}`}
      onMouseEnter={(event) =>
        handleMouseEnter(event, { row: rowElement.id, column: false })
      }
      onMouseLeave={(event) =>
        handleMouseLeave(event, { row: rowElement.id, column: false })
      }
    >
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
  rowElementId,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const { COLUMN, GUTTER, USERINIPUT, CELL } = classDictionary;
  return columns.componentList.map((el, index) => {
    const columnElementId = el.id;
    return (
      <>
        {index === 0 && <div className={`${COLUMN} ${GUTTER}`}></div>}
        <div
          className={`${USERINIPUT} ${CELL} ${rowElementId} ${columnElementId}`}
          onMouseEnter={(event) =>
            handleMouseEnter(event, { row: rowElementId, column: el.id })
          }
          onMouseLeave={(event) =>
            handleMouseLeave(event, { row: rowElementId, column: el.id })
          }
        >
          {/* <Input primaryElement={displayElement} disabled={true} /> */}
          <input type={displayElement.htmlTagName} disabled={true} />
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

const HeaderRow = ({
  classDictionary,
  handlers,
  columns,
  lastClickedOnId,
  rowElementId,
  handleMouseEnter,
  handleMouseLeave,
}) => {
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
            <div
              className={`${COLUMN} ${CELL} ${HEADER} ${el.id} ${rowElementId}`}
              onMouseEnter={(event) =>
                handleMouseEnter(event, { row: false, column: el.id })
              }
              onMouseLeave={(event) =>
                handleMouseLeave(event, { row: false, column: el.id })
              }
            >
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
