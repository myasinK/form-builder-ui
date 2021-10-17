import React from "react";
import Input from "../primary/Input";
import EditableData from "./EditableData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import FaLeftRight from "../icons/FaLeftRight";
import FaUpDown from "../icons/FaUpDown";

function TableAlt({ responses, handlers, lastClickedOnId }) {
  const rows = responses[0];
  const columns = responses[1];
  const { displayElement } = rows.componentDescriptor;

  const FirstRow = () => {
    return (
      <div className={"header row"}>
        <div className="cell"></div>
        {columns.componentList.map((el, index) => {
          return (
            <>
              {index === 0 && <div className={"column gutter cell"}></div>}
              <div className={"cell column-header"}>
                <div className={"move-column-icon-container"}>
                  <FaLeftRight
                    draggable={true}
                    onDragStart={() =>
                      handlers.handleDragStart(index, columns.id)
                    }
                  />
                </div>
                <EditableData
                  primaryElement={el}
                  lastClickedOnId={lastClickedOnId}
                  handlers={handlers}
                />
                <div
                  onClick={() => handlers.delete(el.id)}
                  className={"delete-column-icon-container"}
                >
                  <FontAwesomeIcon
                    className={"delete-column-icon"}
                    icon={faMinusCircle}
                    draggable={true}
                    onDragStart={() => handlers.handleDragStart(index, rows.id)}
                  />
                </div>
              </div>
              <div className={"column gutter cell"}></div>
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
            <div draggable={true}>
              <FaUpDown draggable={true} />
            </div>
            <EditableData
              primaryElement={rowEl}
              lastClickedOnId={lastClickedOnId}
              handlers={handlers}
            />
          </div>
          {columns.componentList.map((el, index) => {
            return (
              <>
                {index === 0 && <div className={"column gutter cell"}></div>}
                <div className={"input cell"}>
                  <Input primaryElement={displayElement} disabled={true} />
                </div>
                <div className={"column gutter cell"}></div>
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
