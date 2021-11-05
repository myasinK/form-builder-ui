import React, { useState } from "react";
import "./css/App.css";
import clickRegistrar from "./handlers/clickRegistrar";
import FormView from "./components/secondary/FormView";
import formEventHandlers from "./handlers/formEventHandlers";
import ComponentSelectorView from "./components/secondary/ComponentSelectorView";
import FormPreview from "./components/end-user-views/FormPreview";

function App() {
  let [lastIdClicked, setLastIdClicked] = useState(false);
  let [form, setForm] = useState(null);
  let [dragInfo, setDragInfo] = useState({
    originIndex: false,
    parentId: false,
  });

  const handlers = new formEventHandlers(form, setForm, dragInfo, setDragInfo);

  return (
    <div
      className={"App"}
      onClick={(event) => clickRegistrar(setLastIdClicked)(event)}
    >
      {/* <div id={"test-block1"}></div>
      <div id={"test-block2"}></div>
    <div id={"test-block3"}></div> */}
      {console.log(form)}

      <ComponentSelectorView handlers={handlers} />
      <div className={"form-container"}>
        {form && (
          <FormView
            form={form}
            lastClickedOnId={lastIdClicked}
            handlers={handlers}
            dragInfo={dragInfo}
          />
        )}
      </div>

      <div className={"preview-container"}>
        <div className={"title"}>Preview</div>
        {form && <ScoreContainer form={form} />}
        {form && <FormPreview form={form} handlers={handlers} />}
      </div>
    </div>
  );
}

const ScoreContainer = ({ form }) => {
  const scoredQuestionsOnly = form.componentList.filter(
    (el) => el.componentType.includes("question") && el.componentList[1].scored
  );
  let totalScore = 0;
  scoredQuestionsOnly.map((el) => {
    const { answers } = el.componentList[1];
    const scoreForThisQuestion = answers
      .map((el) => parseInt(el.score))
      .reduce(function (previous, current) {
        return previous + current;
      }, 0);
    totalScore += parseInt(scoreForThisQuestion);
  });
  return (
    <div className={"scores-container"}>
      <div className={"total-score"} id={"total-score"}>
        {totalScore}
      </div>
    </div>
  );
};

export default App;
