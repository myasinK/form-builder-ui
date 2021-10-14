import React, { useState } from "react";
import "./css/App.css";
import clickRegistrar from "./handlers/clickRegistrar";
import FormView from "./components/secondary/FormView";
import formEventHandlers from "./handlers/formEventHandlers";
import ComponentSelectorView from "./components/secondary/ComponentSelectorView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faTrash,
  faTrashAlt,
  faMugHot,
} from "@fortawesome/free-solid-svg-icons";

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
      <FontAwesomeIcon icon={faMugHot} />
      {console.log(form)}
      <button onClick={() => handlers.startNewForm()}>Start new form</button>
      <button onClick={() => handlers.clearForm()}>Clear form</button>
      <ComponentSelectorView handlers={handlers} />
      {form && (
        <FormView
          form={form}
          lastClickedOnId={lastIdClicked}
          handlers={handlers}
          dragInfo={dragInfo}
        />
      )}
    </div>
  );
}

export default App;
