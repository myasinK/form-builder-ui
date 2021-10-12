import React from "react";
import QuestionView from "./QuestionView";

function FormView({ form, lastClickedOnId, handlers }) {
  const thereAreObjectsToRender = form.componentList.length > 0;
  if (thereAreObjectsToRender) {
    return form.componentList.map((q) => {
      if (q.componentType.includes("question")) {
        return (
          <QuestionView
            questionObject={q}
            lastClickedOnId={lastClickedOnId}
            handlers={handlers}
          />
        );
      } else if (q.componentType.includes("standalone")) {
        return <div>standalone</div>;
      } else return null;
    });
  } else {
    return <div className={"form-container"}>Form doesn't exist yet</div>;
  }
}

export default FormView;
