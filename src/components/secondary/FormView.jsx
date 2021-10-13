import React from "react";
import QuestionView from "./QuestionView";
import StandaloneView from "./StandaloneView";

function FormView({ form, lastClickedOnId, handlers }) {
  const thereAreObjectsToRender = form.componentList.length > 0;

  const formId = form.id;

  if (thereAreObjectsToRender) {
    return form.componentList.map((q, index) => {
      if (q.componentType.includes("question")) {
        return (
          <>
            {index === 0 && (
              <div
                onDrop={(event) => handlers.handleOnDrop(event, index)}
                onDragOver={(event) => handlers.handleOnDragOver(event)}
                className={"question-drag-drop-spacer"}
              >
                Drop zone
              </div>
            )}
            <div
              className={"move-area"}
              draggable={true}
              onDragStart={() => handlers.handleDragStart(index, formId)}
            >
              Move
            </div>
            <QuestionView
              key={q.id}
              questionObject={q}
              lastClickedOnId={lastClickedOnId}
              handlers={handlers}
            />
            {
              <div
                onDrop={(event) => handlers.handleOnDrop(event, index + 1)}
                onDragOver={(event) => handlers.handleOnDragOver(event)}
                className={"question-drag-drop-spacer"}
              >
                Drop zone
              </div>
            }
          </>
        );
      } else if (q.componentType.includes("standalone")) {
        return (
          <>
            {index === 0 && (
              <div
                onDrop={(event) => handlers.handleOnDrop(event, index)}
                onDragOver={(event) => handlers.handleOnDragOver(event)}
                className={"question-drag-drop-spacer"}
              >
                Drop zone
              </div>
            )}
            <div
              draggable={true}
              onDragStart={() => handlers.handleDragStart(index, formId)}
              className={"move-area"}
            >
              Move
            </div>
            <StandaloneView
              key={q.id}
              standaloneObject={q}
              lastClickedOnId={lastClickedOnId}
              handlers={handlers}
            />
            {
              <div
                onDrop={(event) => handlers.handleOnDrop(event, index + 1)}
                onDragOver={(event) => handlers.handleOnDragOver(event)}
                className={"question-drag-drop-spacer"}
              >
                Drop zone
              </div>
            }
          </>
        );
      } else return null;
    });
  } else {
    // if there are no objects to render
    return <div className={"form-container"}>Form doesn't exist yet</div>;
  }
}

export default FormView;
