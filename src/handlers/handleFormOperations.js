import InterfaceCollection from "../Interface/InterfaceCollection";
import InterfaceElement from "../Interface/InterfaceElement";

const handleFormOperations = (form, formSetter) => {
  return function (instructions) {
    const { action, questionType = null, targetId, data = null } = instructions;
    switch (action) {
      case "paragraph":
        const elementCollection = new InterfaceCollection({
          parentId: form.id,
          componentType: "standalone",
          componentList: [],
        });
        const element = new InterfaceElement({
          componentType: questionType,
          parentId: elementCollection.id,
          htmlType: action,
          htmlTagName: "p",
          htmlInnerText: "Click to edit",
          htmlClassAttr: null,
        });
        elementCollection.componentList.push(element.getElement());
        form.componentList.push(elementCollection.getAll());
        const ef = Object.assign(new InterfaceCollection(), form);
        formSetter(ef);
        break;
      case "header1":
        const ec = new InterfaceCollection({
          parentId: form.id,
          componentType: "standalone",
          componentList: [],
        });
        const e = new InterfaceElement({
          componentType: questionType,
          parentId: ec.id,
          htmlType: action,
          htmlTagName: "p",
          htmlInnerText: "Click to edit",
          htmlClassAttr: null,
        });
        ec.componentList.push(e.getElement());
        form.componentList.push(ec.getAll());
        const eff = Object.assign(new InterfaceCollection(), form);
        formSetter(eff);
        break;
      case "create-new-form":
        createNewForm(formSetter);
        break;
      case "null-form":
        formSetter(null);
        break;
      case "create-and-insert-new-question":
        formSetter(createAndInsertNewQuestion(form, questionType, targetId));
        break;
      case "delete":
        const updatedForm = deleteId(targetId, "d", form);
        formSetter(updatedForm);
        break;
      case "update":
        const editedForm = update(form, targetId, null, {
          propertyName: "htmlInnerText",
          propertyValue: data,
        });
        formSetter(Object.assign(new InterfaceCollection(), editedForm));
        break;
      case "add-response-option":
        const inputType = questionType.split("-")[1];
        let payload = new InterfaceElement({
          parentId: targetId,
          htmlType: inputType,
          componentType: `${inputType}-option`,
          htmlTagName: "span",
          htmlInnerText: "Click to edit",
        });
        const newForm = Object.assign(
          new InterfaceCollection(),
          form.pushPayloadToTargetWithId(payload.getElement(), targetId)
        );
        formSetter(newForm);
        break;

      default:
        console.log("default:", instructions);
        break;
    }
  };
};

const update = (form, idToUpdate, updatedObject, updateInstructions) => {
  const updatedForm = form.updateId(
    idToUpdate,
    updatedObject,
    updateInstructions
  );
  return updatedForm;
};

const deleteId = (idToDelete, action = "d", formObj) => {
  let newForm = Object.assign(new InterfaceCollection(), formObj);
  return newForm.fetchDeleteId(idToDelete, action);
};

const createAndInsertNewQuestion = (form, questionType, targetId) => {
  const responseInputType = questionType.split("-")[1];
  const question = createQuestion(targetId, questionType, []);
  const prompt = createPrompt(question.id);
  const responses = createResponses(question.id);
  const updatedResponses = seedResponseOption(responses, responseInputType);
  question.componentList.push(prompt.getElement());
  question.componentList.push(updatedResponses.getAll());
  form.componentList.push(question.getAll());
  let newForm = Object.assign(new InterfaceCollection(), form);
  return newForm;
};

const createQuestion = (
  parentId,
  componentType = "question",
  componentList = []
) => {
  return new InterfaceCollection({
    id: false,
    parentId,
    componentType,
    componentList,
  });
};

const seedResponseOption = (responsesObj, responseInputType) => {
  const clonedResponsesObj = Object.assign(
    new InterfaceCollection(),
    responsesObj
  );
  const parentOfOption = responsesObj.id;
  const componentType = `${responseInputType}-option`;
  // const { componentList } = responsesObj;
  const htmlType = responseInputType;
  if (!(responseInputType === "textarea")) {
    const newOption = new InterfaceElement({
      id: false,
      componentType,
      parentId: parentOfOption,
      htmlInnerText: "Click to edit",
      htmlType,
      htmlTagName: "span",
    });
    clonedResponsesObj.componentList.push(newOption.getElement());
  }
  return clonedResponsesObj;
};

const createPrompt = (parentId) => {
  return new InterfaceElement({
    id: false,
    componentType: "prompt",
    parentId,
    htmlInnerText: "Click to edit",
    htmlType: null,
    htmlTagName: "p",
  });
};

const createResponses = (parentId) => {
  return new InterfaceCollection({
    id: false,
    parentId,
    componentType: "responses",
    componentList: [],
  });
};

const createNewForm = (formSetter) => {
  const newForm = new InterfaceCollection({
    id: false,
    componentType: "form",
    parentId: "base",
    componentDescriptor: {},
    componentList: [],
  });
  formSetter(newForm);
};

export default handleFormOperations;
