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
        {form && <ScoreContainer form={form} handlers={handlers} />}
        {form && <FormPreview form={form} handlers={handlers} />}
      </div>
    </div>
  );
}

const ScoreContainer = ({ form, handlers }) => {
  let score = { total: 0 };
  let sectionsArray = [];
  if (form.componentList.length > 0) {
    const scoredResponsesArray = form.componentList
      .filter((q) => q.componentType.includes("question"))
      .map((question) => question.componentList[1])
      .filter((responses) => responses.scored);
    sectionsArray = scoredResponsesArray
      .map((responses) => responses.sectionName)
      .filter((name) => !(name === false));
    const thereAreSections = sectionsArray.length > 0;
    if (thereAreSections) {
      sectionsArray.forEach((sectionName) => {
        Object.defineProperty(score, sectionName, { value: 0, writable: true });
      });
    }
    scoredResponsesArray.forEach((responsesObject) => {
      const { answers } = responsesObject;
      const scoreValueForThisQuestion = answers
        .map((answer) => parseInt(answer.score))
        .reduce(function (previous, current) {
          return previous + current;
        }, 0);
      score.total += scoreValueForThisQuestion;
      if (responsesObject.sectionName) {
        score[responsesObject.sectionName] += scoreValueForThisQuestion;
      }
    });
  }
  return (
    <div className={"scores-container"}>
      <div className={"total-score"} id={"total-score"}>
        Total score: {score.total}
      </div>
      <div className={"section-scores"}>
        {sectionsArray.map((sectionName) => (
          <div className={"section-details"}>
            <span className={"section-name"}>{`${sectionName} Total: `}</span>
            <span className={"section-score"}>{score[sectionName]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
