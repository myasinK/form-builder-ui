import React, { useState } from "react";
import "./css/App.css";
import clickRegistrar from "./handlers/clickRegistrar";
import FormView from "./components/secondary/FormView";
import formEventHandlers from "./handlers/formEventHandlers";
import ComponentSelectorView from "./components/secondary/ComponentSelectorView";

function App() {
  let [lastIdClicked, setLastIdClicked] = useState(false);
  let [form, setForm] = useState(null);

  const handlers = new formEventHandlers(form, setForm);
  
  return (
    <div
      className={"App"}
      onClick={(event) => clickRegistrar(setLastIdClicked)(event)}
    >
      {console.log(form)}
      <button onClick={() => handlers.startNewForm()}>Start new form</button>
      <button onClick={() => handlers.clearForm()}>Clear form</button>
      <ComponentSelectorView handlers={handlers} />
      {form && (
        <FormView
          form={form}
          lastClickedOnId={lastIdClicked}
          handlers={handlers}
        />
      )}
    </div>
  );
}

export default App;
