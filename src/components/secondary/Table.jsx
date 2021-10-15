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

  const dragRowElement = new InterfaceElement({
    htmlInnerText: (
      <FontAwesomeIcon className={"drag-hamburger-in-cell"} icon={faBars} />
    ),
    htmlClassAttr: "row-drag-bar",
    htmlTagName: "span",
    draggable: true,
  }).getElement();

  const dropRowElement = new InterfaceElement({
    htmlInnerText: "",
    htmlClassAttr: "row-drop-zone",
    htmlTagName: "span",
    draggable: false,
  }).getElement();

  const dragColumnElement = new InterfaceElement({
    htmlInnerText: (
      <FontAwesomeIcon className={"drag-hamburger-in-cell"} icon={faBars} />
    ),
    htmlClassAttr: "column-drag-bar",
    htmlTagName: "span",
    draggable: true,
  }).getElement();

  const dropColumnElement = new InterfaceElement({
    htmlInnerText: "",
    htmlClassAttr: "column-drop-zone",
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
                >
                  <Span
                    primaryElement={dropColumnElement}
                    handlers={handlers}
                    action={"drop"}
                    dragInfo={{
                      parentId: columns.id,
                      desinationIndex: index,
                    }}
                  />
                </th>
              )}
              <th className={"column-header-cell"}>
                <div className={"column-move-and-delete-container"}>
                  <Span
                    primaryElement={dragColumnElement}
                    handlers={handlers}
                    action={"drag"}
                    dragInfo={{ parentId: columns.id, originIndex: index }}
                  />
                  <FontAwesomeIcon
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
              <th className={"column-drop-cell"}>
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
            {index === 0 && (
              <tr className={"drop-row"}>
                <td className={"row-drop-cell"}>
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
              </tr>
            )}
            <tr key={rowId} className={"input-row"}>
              <th className={"row-label-cell"}>
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
                <FontAwesomeIcon
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
