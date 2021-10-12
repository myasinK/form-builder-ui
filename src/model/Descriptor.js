import { definitions } from "./FormComponentTypes";
import InterfaceElement from "../Interface/InterfaceElement";

class Descriptor {
  constructor(componentType, conditionals = null) {
    this.componentType = componentType;
    this.isTabular = componentType.includes("tabular");
    this.isQuestion = componentType.includes("question");
    this.isResponses = componentType.includes("responses");
    this.isStandalone = componentType.includes("standalone");
    this.endUserHtmlInputType =
      definitions.endUserHtmlInputType[componentType] || null; // this is lazy
    this.canHavePrompt = componentType.includes("question") ? true : false;
    this.requiresPrompt = false;
    this.conditionals = conditionals;
    const generateDisplayElement = () => {
      if (componentType === "form") {
        return null;
      } else if (this.isQuestion || this.isResponses) {
        return new InterfaceElement({
          parentId: "",
          componentType: "disply-only-input",
          htmlTagName: this.endUserHtmlInputType,
        }).getElement();
      } else if (this.isStandalone) {
        return null;
      }
    };
    this.displayElement = generateDisplayElement();
  }
  getJSON = () => {
    return {
      isTabular: this.isTabular,
      isQuestion: this.isQuestion,
      isResponses: this.isResponses,
      isStandalone: this.isStandalone,
      componentType: this.componentType,
      endUserHtmlInputType: this.endUserHtmlInputType,
      canHavePrompt: this.canHavePrompt,
      requiresPrompt: this.requiresPrompt,
      conditionals: this.conditionals,
      displayElement: this.displayElement,
    };
  };
}

export default Descriptor;
