import React from "react";
import InterfaceElement from "../../Interface/InterfaceElement";
import Input from "../primary/Input";
import Span from "../primary/Span";
import EditableData from "./EditableData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

function Table({ rows, columns, lastClickedOnId, handlers }) {
  const columnsArray = [...columns.componentList];
  const rowsArray = rows.componentList;
  const { displayElement } = rows.componentDescriptor;

  const dragRowElement = new InterfaceElement({
    htmlInnerText: "drag bar (for row objects)",
    htmlClassAttr: "row-drag-bar",
    htmlTagName: "span",
    draggable: true,
  }).getElement();

  const dropRowElement = new InterfaceElement({
    htmlInnerText: "drop area (for row objects)",
    htmlClassAttr: "row-drop-area",
    htmlTagName: "span",
    draggable: false,
  }).getElement();

  const dragColumnElement = new InterfaceElement({
    htmlInnerText: "drag bar (for column objects)",
    htmlClassAttr: "column-drag-bar",
    htmlTagName: "span",
    draggable: true,
  }).getElement();

  const dropColumnElement = new InterfaceElement({
    htmlInnerText: "drop area (for column objects)",
    htmlClassAttr: "column-drop-area",
    htmlTagName: "span",
    draggable: false,
  }).getElement();

  return (
    <table>
      <tr>
        <th></th>
        {columnsArray.map((el, index) => {
          return (
            <>
              <th key={`${el.id}-header-row`}>
                {index === 0 && (
                  <Span
                    primaryElement={dropColumnElement}
                    handlers={handlers}
                    action={"drop"}
                    dragInfo={{ parentId: columns.id, desinationIndex: index }}
                  />
                )}
                <Span
                  primaryElement={dragColumnElement}
                  handlers={handlers}
                  action={"drag"}
                  dragInfo={{ parentId: columns.id, originIndex: index }}
                />
                <EditableData
                  primaryElement={el}
                  lastClickedOnId={lastClickedOnId}
                  handlers={handlers}
                />
                &nbsp;
                <FontAwesomeIcon
                  onClick={() => handlers.delete(el.id)}
                  icon={faMinusCircle}
                />
                <Span
                  primaryElement={dropColumnElement}
                  handlers={handlers}
                  action={"drop"}
                  dragInfo={{
                    parentId: columns.id,
                    desinationIndex: index + 1,
                  }}
                />
              </th>
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
                <td>
                  <Span
                    primaryElement={dropRowElement}
                    handlers={handlers}
                    action={"drop"}
                    dragInfo={{
                      parentId: rows.id,
                      desinationIndex: index,
                    }}
                  />
                </td>
              )}
            </tr>
            <tr key={rowId}>
              <th>
                <Span
                  primaryElement={dragRowElement}
                  handlers={handlers}
                  action={"drag"}
                  dragInfo={{ parentId: rows.id, originIndex: index }}
                />
                <EditableData
                  primaryElement={el}
                  lastClickedOnId={lastClickedOnId}
                  handlers={handlers}
                />
                &nbsp;
                <FontAwesomeIcon
                  onClick={() => handlers.delete(el.id)}
                  icon={faMinusCircle}
                />
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
            <tr className={"drop-area-row"}>
              <td>
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
