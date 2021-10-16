import React from "react";
import Input from "../primary/Input";
import EditableData from "./EditableData";

function TableAlt({ responses, handlers, lastClickedOnId }) {
  const rows = responses[0];
  const columns = responses[1];
  const { displayElement } = rows.componentDescriptor;
  //   const numberOfColumns = 2 * columns.componentList.length + 1;
  //   const numberOfRows = 2 * rows.componentList.length + 1;
  const FirstRow = () => {
    return (
      <div className={"header row"}>
        <div className="cell"></div>
        {columns.componentList.map((el, index) => {
          return (
            <>
              {index === 0 && <div className={"column gutter"}></div>}
              <div className={"cell column-header"}>
                <EditableData
                  primaryElement={el}
                  lastClickedOnId={lastClickedOnId}
                  handlers={handlers}
                />
              </div>
              <div className={"column gutter"}></div>
            </>
          );
        })}
      </div>
    );
  };
  const BodyRow = ({ rowEl, columns }) => {
    return (
      <>
        <div className={"row body"}>
          <div className={"cell row-title"}>
            <EditableData
              primaryElement={rowEl}
              lastClickedOnId={lastClickedOnId}
              handlers={handlers}
            />
            {rowEl.htmlInnerText}
          </div>
          {columns.componentList.map((el, index) => {
            return (
              <>
                {index === 0 && <div className={"column gutter"}></div>}
                <div className={"input cell"}>
                  <Input primaryElement={displayElement} disabled={true} />
                </div>
                <div className={"column gutter"}></div>
              </>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <div className={"table-container"}>
      <FirstRow />
      {rows.componentList.map((el, index) => {
        return (
          <>
            {index === 0 && <div className={"row gutter"}></div>}
            <BodyRow rowEl={el} columns={columns} />
            <div className={"row gutter"}></div>
          </>
        );
      })}
    </div>
  );
}

export default TableAlt;
