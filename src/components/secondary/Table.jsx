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
        {columnsArray.map((el) => {
          return (
            <th key={`${el.id}-header-row`}>
              <EditableData
                primaryElement={el}
                lastClickedOnId={lastClickedOnId}
                handlers={handlers}
              />
              <span onClick={() => handlers.delete(el.id)}>-</span>
            </th>
          );
        })}
      </tr>
      {/* <Body rArray={rowsArray} cArray={columnsArray} /> */}
      {rowsArray.map((el) => {
        const rowId = el.id;
        return (
          <tr key={rowId}>
            <th>
              <EditableData
                primaryElement={el}
                lastClickedOnId={lastClickedOnId}
                handlers={handlers}
              />
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
        );
      })}
    </table>
  );
}

export default Table;
