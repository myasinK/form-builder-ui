import React from "react";
import Input from "../primary/Input";
import EditableData from "./EditableData";

function Table({ rows, columns, lastClickedOnId, handlers }) {
  const columnsArray = [...columns.componentList];
  const rowsArray = rows.componentList;
  const { displayElement } = rows.componentDescriptor;

  return (
    <table>
      <tr>
        <th></th>
        {columnsArray.map((el, index) => {
          return (
            <>
              {index === 0 && (
                <div
                  onDrop={(event) => handlers.handleOnDrop(event, index)}
                  onDragOver={(event) => handlers.handleOnDragOver(event)}
                  className={"column-drop-zone"}
                >
                  Drop zone
                </div>
              )}
              <th key={`${el.id}-header-row`}>
                <div
                  onDragStart={() =>
                    handlers.handleDragStart(index, columns.id)
                  }
                  draggable={true}
                  className={"column-drag-bar"}
                >
                  Drag bar
                </div>
                <EditableData
                  primaryElement={el}
                  lastClickedOnId={lastClickedOnId}
                  handlers={handlers}
                />
                &nbsp;
                <span onClick={() => handlers.delete(el.id)}>-</span>
              </th>
              <div
                onDrop={(event) => handlers.handleOnDrop(event, index + 1)}
                onDragOver={(event) => handlers.handleOnDragOver(event)}
                className={"column-drop-zone"}
              >
                Drop zone
              </div>
            </>
          );
        })}
      </tr>
      {rowsArray.map((el, index) => {
        const rowId = el.id;
        return (
          <>
            <tr>
              {index === 0 && (
                <div
                  onDrop={(event) => handlers.handleOnDrop(event, index)}
                  onDragOver={(event) => handlers.handleOnDragOver(event)}
                  className={"row-drop-zone"}
                >
                  Drop zone
                </div>
              )}
            </tr>
            <tr key={rowId}>
              <th>
                <div
                  onDragStart={() => handlers.handleDragStart(index, rows.id)}
                  draggable={true}
                  className={"row-drag-bar"}
                >
                  Drag bar
                </div>
                <EditableData
                  primaryElement={el}
                  lastClickedOnId={lastClickedOnId}
                  handlers={handlers}
                />
                &nbsp;
                <span onClick={() => handlers.delete(el.id)}>-</span>
              </th>
              {columnsArray.map((el) => {
                const cellId = `${rowId}-${el.id}`;
                return (
                  <td key={cellId}>
                    <Input
                      primaryElement={displayElement}
                      disabled={true}
                      handlers={null}
                    />
                  </td>
                );
              })}
            </tr>
            <tr>
              <div
                onDrop={(event) => handlers.handleOnDrop(event, index + 1)}
                onDragOver={(event) => handlers.handleOnDragOver(event)}
                className={"row-drop-zone"}
              >
                Drop zone
              </div>
            </tr>
          </>
        );
      })}
    </table>
  );
}

export default Table;
