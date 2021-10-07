import React from "react";
import Input from "../components/primary/Input";
import Paragraph from "../components/primary/Paragraph";
import Span from "../components/primary/Span";

// Following function requires following parameters:
// idOfLastClickedTarget, staticId, inputId

function withEditable(StaticComponent, InputComponent) {
  return ({ idOfLastClickedTarget, staticId, inputId, ...props }) => (
    <div>
      {!(idOfLastClickedTarget === staticId) && <StaticComponent {...props} />}
      {idOfLastClickedTarget === inputId && <InputComponent {...props} />}
    </div>
  );
}

export const SpanWithEditable = withEditable(Span, Input);

export default withEditable;
