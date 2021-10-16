import React from "react";
import InterfaceElement from "../../Interface/InterfaceElement";
import Input from "../primary/Input";
import Span from "../primary/Span";
import EditableData from "./EditableData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faBars } from "@fortawesome/free-solid-svg-icons";

function Table({ rows, columns, lastClickedOnId, handlers }) {
  const columnsArray = [...columns.componentList];
  const rowsArray = rows.componentList;
  const { displayElement } = rows.componentDescriptor;

  const dropRowElement = new InterfaceElement({
    htmlInnerText: "",
    htmlClassAttr: "row-drop-zone",
    htmlTagName: "span",
    draggable: false,
  }).getElement();

  return (
    <table>
      <tr>
        <th className={"first column-header-cell"}></th>
        {columnsArray.map((el, index) => {
          return (
            <>
              {index === 0 && (
                <th
                  key={`${el.id}-header-row-${index}`}
                  className={"column-drop-cell"}
                  onDrop={(event) => handlers.handleOnDrop(event, index)}
                  onDragOver={(event) => handlers.handleOnDragOver(event)}
                ></th>
              )}
              <th className={"column-header-cell"}>
                <div className={"column-move-and-delete-container"}>
                  <FontAwesomeIcon
                    className={"drag-hamburger-in-cell"}
                    icon={faBars}
                    draggable={true}
                    onDragStart={() =>
                      handlers.handleDragStart(index, columns.id)
                    }
                  />
                  <FontAwesomeIcon
                    className={"delete-column-icon"}
                    onClick={() => handlers.delete(el.id)}
                    icon={faMinusCircle}
                  />
                </div>
                <EditableData
                  primaryElement={el}
                  lastClickedOnId={lastClickedOnId}
                  handlers={handlers}
                />
              </th>
              <th
                className={"column-drop-cell"}
                onDrop={(event) => handlers.handleOnDrop(event, index)}
                onDragOver={(event) => handlers.handleOnDragOver(event)}
              ></th>
            </>
          );
        })}
      </tr>
      {rowsArray.map((el, index) => {
        const rowId = el.id;
        return (
          <>
            {index === 0 && (
              <tr className={"drop-row"}>
                <td
                  className={"row-drop-cell"}
                  onDrop={(event) => handlers.handleOnDrop(event, index)}
                  onDragOver={(event) => handlers.handleOnDragOver(event)}
                ></td>
              </tr>
            )}
            <tr key={rowId} className={"input-row"}>
              <th className={"row-label-cell"}>
                <FontAwesomeIcon
                  className={"drag-hamburger-in-cell"}
                  icon={faBars}
                  draggable={true}
                  onDragStart={() => handlers.handleDragStart(index, rows.id)}
                />
                <EditableData
                  primaryElement={el}
                  lastClickedOnId={lastClickedOnId}
                  handlers={handlers}
                />
                <FontAwesomeIcon
                  className={"delete-column-icon"}
                  onClick={() => handlers.delete(el.id)}
                  icon={faMinusCircle}
                />
              </th>
              {columnsArray.map((el, index) => {
                const cellId = `${rowId}-${el.id}`;
                return (
                  <>
                    {index === 0 && <td className={"drop-cell"}></td>}
                    <td className={"input-container-cell"} key={cellId}>
                      <Input
                        primaryElement={displayElement}
                        disabled={true}
                        handlers={null}
                      />
                    </td>
                    <td className={"drop-cell"}></td>
                  </>
                );
              })}
            </tr>
            <tr className={"drop-row"}>
              <td className={"row-drop-cell"}>
                <Span
                  primaryElement={dropRowElement}
                  handlers={handlers}
                  action={"drop"}
                  dragInfo={{
                    parentId: rows.id,
                    desinationIndex: index + 1,
                  }}
                />
              </td>
            </tr>
          </>
        );
      })}
    </table>
  );
}

export default Table;
