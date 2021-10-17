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
              {index === 0 && (
                <div
                  onDrop={(event) => handlers.handleOnDrop(event, index)}
                  onDragOver={(event) => handlers.handleOnDragOver(event)}
                  className={"column gutter cell"}
                ></div>
              )}
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
                <div className={"delete-column-icon-container"}>
                  <FontAwesomeIcon
                    onClick={() => handlers.delete(el.id)}
                    className={"delete-column-icon"}
                    icon={faMinusCircle}
                  />
                </div>
              </div>
              <div
                onDrop={(event) => handlers.handleOnDrop(event, index)}
                onDragOver={(event) => handlers.handleOnDragOver(event)}
                className={"column gutter cell"}
              ></div>
            </>
          );
        })}
      </div>
    );
  };
  const BodyRow = ({ index, id, rowEl, columns }) => {
    return (
      <>
        <div className={"row body"}>
          <div className={"cell row-title"}>
            <div
              draggable={true}
              onDragStart={() => handlers.handleDragStart(index, id)}
            >
              <FaUpDown />
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
      <div className={"header row"}>
        <div className="cell"></div>
        {columns.componentList.map((el, index) => {
          return (
            <>
              {index === 0 && (
                <div
                  onDrop={(event) => handlers.handleOnDrop(event, index)}
                  onDragOver={(event) => handlers.handleOnDragOver(event)}
                  className={"column gutter cell"}
                ></div>
              )}
              <div className={"cell column-header"}>
                <div
                  className={"move-column-icon-container"}
                  draggable={true}
                  onDragStart={() => {
                    [
                      ...document.getElementsByClassName("column gutter cell"),
                    ].map((el) => (el.style.visibility = "visible"));
                    handlers.handleDragStart(index, columns.id);
                  }}
                  onDragEnd={(event) => {
                    event.preventDefault();
                    [
                      ...document.getElementsByClassName("column gutter cell"),
                    ].map((el) => (el.style.visibility = "hidden"));
                  }}
                >
                  <FaLeftRight />
                </div>
                <EditableData
                  primaryElement={el}
                  lastClickedOnId={lastClickedOnId}
                  handlers={handlers}
                />
                <div className={"delete-column-icon-container"}>
                  <FontAwesomeIcon
                    onClick={() => handlers.delete(el.id)}
                    className={"delete-column-icon"}
                    icon={faMinusCircle}
                  />
                </div>
              </div>
              <div
                onDrop={(event) => handlers.handleOnDrop(event, index)}
                onDragOver={(event) => handlers.handleOnDragOver(event)}
                className={"column gutter cell"}
              ></div>
            </>
          );
        })}
      </div>
      {rows.componentList.map((el, index) => {
        return (
          <>
            {index === 0 && (
              <div
                onDrop={(event) => handlers.handleOnDrop(event, index)}
                onDragOver={(event) => handlers.handleOnDragOver(event)}
                className={"row gutter"}
              ></div>
            )}
            <div className={"row body"}>
              <div className={"cell row-title"}>
                <div
                  draggable={true}
                  onDragStart={() => {
                    [...document.getElementsByClassName("row gutter")].map(
                      (el) => (el.style.visibility = "visible")
                    );
                    handlers.handleDragStart(index, rows.id);
                  }}
                  onDragEnd={(event) => {
                    event.preventDefault();
                    [...document.getElementsByClassName("row gutter")].map(
                      (el) => (el.style.visibility = "hidden")
                    );
                  }}
                >
                  <FaUpDown />
                </div>
                <EditableData
                  primaryElement={el}
                  lastClickedOnId={lastClickedOnId}
                  handlers={handlers}
                />
              </div>
              {columns.componentList.map((el, index) => {
                return (
                  <>
                    {index === 0 && (
                      <div className={"column gutter cell"}></div>
                    )}
                    <div className={"input cell"}>
                      <Input primaryElement={displayElement} disabled={true} />
                    </div>
                    <div className={"column gutter cell"}></div>
                  </>
                );
              })}
            </div>
            <div
              onDrop={(event) => handlers.handleOnDrop(event, index)}
              onDragOver={(event) => handlers.handleOnDragOver(event)}
              className={"row gutter"}
            ></div>
          </>
        );
      })}
    </div>
  );
}

export default TableAlt;
