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
        {form && <FormPreview form={form} handlers={handlers} />}
      </div>
    </div>
  );
}

export default App;
