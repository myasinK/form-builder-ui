import React, { useState } from "react";
import "./css/TableVersionThree.css";
import EditableData from "./EditableData";
import FaLeftRight from "../icons/FaLeftRight";
import FaUpDown from "../icons/FaUpDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";


function TableVersionThree({ responses, handlers, lastClickedOnId }) {
  const columns = ["col one", "col two", "col three", "col four"];
  const rows = ["row one", "row two", "row three", "row four"];

  let [hoveringOver, setHoveringOver] = useState({
    rowId: false,
    columnId: false,
  });

  const rowsObject = responses && responses[0];
  const columnsObject = responses && responses[1];

  const handleMouseEnter = (event, json) => {
    event.preventDefault();
    const { rowId, columnId } = json;
    setHoveringOver({ rowId, columnId });
  };

  const handleMouseLeave = (event) => {
    event.preventDefault();
    setHoveringOver({ rowId: false, columnId: false });
  };
  //   const { displayElement } = rowsObject.componentDescriptor;
  return (
    <div className={"body-of-table"}>
      <TopRow
        handlers={handlers}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        hoveringOver={hoveringOver}
        lastClickedOnId={lastClickedOnId}
        columnStringArray={columns}
      />
      <BodyContainer
        handlers={handlers}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        hoveringOver={hoveringOver}
        lastClickedOnId={lastClickedOnId}
        rows={rows}
        columns={columns}
      />
    </div>
  );
}

//

const TableCell = ({
  innerText = "",
  handleMouseEnter = null,
  handleMouseLeave = null,
  hoveringOver,
  handlers,
  lastClickedOnId,
  rowId = false,
  columnId = false,
}) => {
  let className = "table-cell";
  const hoveringOverRow = Object.assign({}, hoveringOver).rowId;
  const hoveringOverColumn = Object.assign({}, hoveringOver).columnId;
  if (hoveringOverRow || hoveringOverColumn) {
    if (hoveringOverRow === rowId || hoveringOverColumn === columnId) {
      className += " hover";
    }
  }
  return (
    <div
      onMouseEnter={(event) => handleMouseEnter(event, { rowId, columnId })}
      onMouseLeave={(event) => handleMouseLeave(event)}
      className={className}
    >
      {innerText}
    </div>
  );
};

const ColumnTitlesRowContainer = ({
  columnStringArray,
  handleMouseEnter = null,
  handleMouseLeave = null,
  hoveringOver,
  handlers,
  lastClickedOnId,
}) => {
  return (
    <div className={"column-titles-container"}>
      {columnStringArray.map((c, index) => {
        return (
          <>
            <GutterColumn index={index} />
            <TableCell
              columnId={c}
              innerText={c}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              hoveringOver={hoveringOver}
              handlers={handlers}
              lastClickedOnId={lastClickedOnId}
              rowId={false}
            />
            {index === columnStringArray.length - 1 && (
              <GutterColumn index={index} />
            )}
          </>
        );
      })}
    </div>
  );
};

const TopRow = ({
  columnStringArray,
  handleMouseEnter = null,
  handleMouseLeave = null,
  hoveringOver,
  handlers,
  lastClickedOnId,
}) => {
  // level 1
  return (
    <div className={"row"}>
      <TableCell
        innerText={""}
        rowId={false}
        columnId={false}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        hoveringOver={hoveringOver}
        handlers={handlers}
        lastClickedOnId={lastClickedOnId}
      />
      <ColumnTitlesRowContainer
        columnStringArray={columnStringArray}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        hoveringOver={hoveringOver}
        handlers={handlers}
        lastClickedOnId={lastClickedOnId}
      />
    </div>
  );
};

const BodyContainer = ({
  rows,
  columns,
  handleMouseEnter = null,
  handleMouseLeave = null,
  hoveringOver,
  handlers,
  lastClickedOnId,
}) => {
  // level 1
  return (
    <div className={"body-container"}>
      <RowTitlesContainer
        rowStringArray={rows}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        hoveringOver={hoveringOver}
        handlers={handlers}
        lastClickedOnId={lastClickedOnId}
      />
      <InputRowsContainer
        rows={rows}
        columns={columns}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        hoveringOver={hoveringOver}
        handlers={handlers}
        lastClickedOnId={lastClickedOnId}
      />
    </div>
  );
};

const RowTitlesContainer = ({
  rowStringArray,
  handleMouseEnter = null,
  handleMouseLeave = null,
  hoveringOver,
  handlers,
  lastClickedOnId,
}) => {
  return (
    <div className={"row-titles-container"}>
      {/* [flex column] gutter-cell-gutter-cell... */}
      {rowStringArray.map((r, index) => {
        return (
          <>
            <GutterRow />
            <TableCell
              columnId={false}
              innerText={"cell"}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              hoveringOver={hoveringOver}
              handlers={handlers}
              lastClickedOnId={lastClickedOnId}
              rowId={r}
            />
            {index === rowStringArray.length - 1 && <GutterRow />}
          </>
        );
      })}
    </div>
  );
};

// logic for rows: for each row info, take columns array, and print gutter row first, print row-row second, print gutter row if this is the last row info

const InputRowsContainer = ({
  rows,
  columns,
  hoveringOver,
  handlers,
  handleMouseEnter,
  handleMouseLeave,
  lastClickedOnId,
}) => {
  return (
    <div className={"input-rows-container"}>
      {rows.map((r, index) => {
        return (
          <>
            <GutterRow />
            <InputRow
              row={r}
              columns={columns}
              hoveringOver={hoveringOver}
              handlers={handlers}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              lastClickedOnId={lastClickedOnId}
            />
            {rows.length - 1 === index && <GutterRow />}
          </>
        );
      })}
    </div>
  );
};

// logic for "row-row": for each column info, print gutter, print cell, print gutter again if last column

const InputRow = ({
  row,
  columns,
  handleMouseEnter = null,
  handleMouseLeave = null,
  hoveringOver,
  handlers,
  lastClickedOnId,
}) => {
  return (
    <div className={"input-row"}>
      {columns.map((c, index) => (
        <>
          <GutterColumn />
          <TableCell
            columnId={c}
            innerText={"cell"}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            hoveringOver={hoveringOver}
            handlers={handlers}
            lastClickedOnId={lastClickedOnId}
            rowId={row}
          />
          {index === columns.length - 1 && <GutterColumn />}
        </>
      ))}
    </div>
  );
};

const GutterRow = () => {
  // 100% of parent width
  return <div className={"row-gutter"}></div>;
};

const GutterColumn = () => {
  return <div className={"column-gutter"}></div>;
};

export default TableVersionThree;
