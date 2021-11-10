import React from "react";
import cssClassDictionary from "../../model/cssClassDictionary";
import Span from "../primary/Span";

function TablePreview({ responses, handlers, lastClickedOnId }) {
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
                handlers={handlers}
                rowsId={rows.id}
              />
            </div>
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
  const { ROW, HEADER, CELL } = classDictionary;
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
      <Span primaryElement={rowElement} />
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
  handlers,
  rowsId,
}) => {
  const { USERINIPUT, CELL } = classDictionary;
  return columns.componentList.map((el, index) => {
    const columnElementId = el.id;
    let name = "";
    let { scoreValue } = el;
    if (!(displayElement.htmlTagName === "radio")) {
      name = `${rowElementId}--${columnElementId}`;
    } else if (displayElement.htmlTagName === "radio") {
      name = `${rowElementId}`;
    }
    return (
      <>
        <div
          className={`${USERINIPUT} ${CELL} ${rowElementId} ${columnElementId}`}
          onMouseEnter={(event) =>
            handleMouseEnter(event, { row: rowElementId, column: el.id })
          }
          onMouseLeave={(event) =>
            handleMouseLeave(event, { row: rowElementId, column: el.id })
          }
        >
          <input
            type={displayElement.htmlTagName}
            disabled={false}
            name={name}
            onChange={(event) => {
              let value;
              let score = scoreValue;
              if (
                displayElement.htmlTagName === "checkbox" ||
                displayElement.htmlTagName === "radio"
              ) {
                value = event.target.checked;
                score = value && score;
              } else {
                value = event.target.value;
                score = false;
              }
              let userInputObject = {
                uid: `${rowElementId}-${el.id}`,
                inputType: displayElement.htmlTagName,
                rowId: rowElementId,
                columnId: el.id,
                value,
                score,
              };
              handlers.handleOnChangeInputTabularPreview(rowsId)(
                userInputObject
              );
            }}
          />
        </div>
      </>
    );
  });
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
  const { HEADER, ROW, BLANK, CELL, COLUMN, TEXTCONTAINER } = classDictionary;
  return (
    <div className={`${HEADER} ${ROW}`}>
      <div className={`${BLANK} ${CELL} ${COLUMN} ${HEADER}`}></div>
      {columns.componentList.map((el, index) => {
        return (
          <>
            <div
              className={`${COLUMN} ${CELL} ${HEADER} ${el.id} ${rowElementId}`}
              onMouseEnter={(event) =>
                handleMouseEnter(event, { row: false, column: el.id })
              }
              onMouseLeave={(event) =>
                handleMouseLeave(event, { row: false, column: el.id })
              }
            >
              <div className={`${COLUMN} ${HEADER} ${TEXTCONTAINER}`}>
                <Span primaryElement={el} />
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default TablePreview;
