import React from "react";
import Div from "../components/primary/Div";

function withQuestionBox(Comp) {
  return (props) => {
    return <Comp className={"question-box"} {...props}></Comp>;
  };
}

export default withQuestionBox;
export let DivWithQuestionBox = withQuestionBox(Div);
