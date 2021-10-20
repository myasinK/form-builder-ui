import InterfaceCollection from "../Interface/InterfaceCollection";
import InterfaceElement from "../Interface/InterfaceElement";
import ElementCollection from "../model/ElementCollection";
import { definitions } from "../model/FormComponentTypes";
import PrimaryElement from "../model/PrimaryElement";

class formEventHandlers {
  constructor(form, formSetter, dragInfo, dragInfoSetter) {
    this.form =
      form === null ? new InterfaceCollection() : Object.assign({}, form);
    this.formSetter = formSetter;
    this.dragInfo = dragInfo;
    this.dragInfoSetter = dragInfoSetter;
  }

  generateResponseLabelJson = ({ parentId }) => {
    const componentType = "response-label-editable-text";
    return new PrimaryElement({
      componentType,
      componentDescriptor: null,
      htmlInnerText: "Click to edit",
      htmlValueAttr: null,
      htmlDefaultValue: null,
      htmlClassAttr: "editable response label",
      htmlPlaceholderAttr: null,
      htmlStyleAttr: null,
      htmlNameAttr: null,
      parentId,
      htmlTagName: "span",
      conditional: false,
      draggable: false,
      id: false,
    }).getJSON();
  };

  addResponse = (responsesId) => {
    // const responsesObj = this.form.fetchId(responsesId);
    // const updatedResponses = this.form.addNewResponseToResponses(
    //   responsesObj[0]
    // );
    // const updatedForm = this.form.updateId(responsesId, updatedResponses, null);
    // this.formSetter(updatedForm);
    const formCollection = new ElementCollection(this.form);
    const updatedForm =
      formCollection.createNewResponseAndAddToResponses(responsesId);
    this.formSetter(updatedForm);
  };

  delete = (targetId) => {
    const form = new ElementCollection(this.form);
    const updatedForm = form.deleteId(targetId);
    this.formSetter(updatedForm);
  };

  updateNamedMemberWithValue = (targetId, updateInstructions) => {
    const updatedForm = this.form.updateId(targetId, null, updateInstructions);
    this.formSetter(updatedForm);
  };

  addFormComponent = (formComponentType) => {
    if (formComponentType.includes("question")) {
      this.addNewQuestion(formComponentType);
    } else if (formComponentType.includes("standalone")) {
      this.addStandalone(formComponentType);
    }
  };

  // create standalones should be merged into one method. Will need addition dictionary to relate type to tagName and innerText
  // createParagraphElement = (standaloneType, parentId) => {
  //   if (definitions.formComponentTypes.STANDALONEPARAGRAPH === standaloneType) {
  //     return new InterfaceElement({
  //       componentType: standaloneType,
  //       componentDescriptor: {},
  //       htmlInnerText: "Click to edit paragraph text",
  //       htmlClassAttr: "standalone-paragraph-entity",
  //       parentId,
  //       htmlTagName: "p",
  //     }).getElement();
  //   }
  // };

  // createHeader = (standaloneType, parentId) => {
  //   const htmlTagName = definitions.standaloneHtmlTagName[standaloneType];
  //   return new InterfaceElement({
  //     componentType: standaloneType,
  //     componentDescriptor: {},
  //     htmlInnerText: "Click to edit header text",
  //     htmlClassAttr: "standalone-paragraph-entity",
  //     parentId,
  //     htmlTagName,
  //   }).getElement();
  // };

  // probably will need to merge addStandalone with addNewQuestion
  addStandalone = (type) => {
    // const parentId = this.form.id;
    // let seededElement;
    // if (type.includes("paragraph")) {
    //   seededElement = this.createParagraphElement(type, parentId);
    // } else if (type.includes("header")) {
    //   seededElement = this.createHeader(type, parentId);
    // }
    // this.form.initializeNewStandaloneObject(type, seededElement);
    // const form = Object.assign(new InterfaceCollection(), this.form);
    // this.formSetter(form);
    // above is original implementation
    const formJson = new ElementCollection(this.form)
      .createNewStandaloneObjectAndAddToForm(type)
      .getJSON();
    this.formSetter(formJson);
  };

  addNewQuestion = (questionType) => {
    // this.form.initializeNewQuestionObject(questionType);
    // const form = Object.assign(new InterfaceCollection(), this.form);
    // this.formSetter(form);
    // above is original implementation
    // const form = new ElementCollection(this.form);
    const formJson = new ElementCollection(this.form)
      .createNewQuestionAndAddToForm(questionType)
      .getJSON();
    this.formSetter(formJson);
  };

  startNewForm = (name = "Intake") => {
    const newForm = new ElementCollection({
      parentId: name,
      componentType: "form",
    }).getJSON();
    this.formSetter(newForm);
  };

  clearForm = () => {
    this.formSetter(null);
  };

  handleDragStart = (originIndex, parentId) => {
    console.log(originIndex, parentId);
    console.log("this got fired");
    this.dragInfo.originIndex = originIndex;
    this.dragInfo.parentId = parentId;
    const updatedDragInfo = Object.assign({}, this.dragInfo);
    this.dragInfoSetter(updatedDragInfo);
  };

  handleOnDragOver = (event) => {
    event.preventDefault();
  };

  handleOnDrop = (event, destinationIndex) => {
    event.preventDefault();
    const { originIndex, parentId } = this.dragInfo;
    this.dragInfoSetter({ originIndex: null, parentId: null });

    const parentObject = Object.assign({}, this.form.fetchId(parentId)[0]);
    const componentList = Object.assign([], parentObject.componentList);

    const targetObjectToBeMoved = { ...componentList[originIndex] };
    componentList[originIndex].id = "delete-this";
    componentList.splice(destinationIndex, 0, targetObjectToBeMoved);
    const updatedList = componentList.filter(
      (el) => !(el.id === "delete-this")
    );
    if (this.form.id === parentId) {
      this.form.componentList = updatedList;
      const updatedForm = Object.assign({}, this.form);
      this.formSetter(updatedForm);
    } else {
      // to be done later
      parentObject.componentList = updatedList;
      const updatedForm = this.form.updateId(
        parentObject.id,
        parentObject,
        null
      );
      this.formSetter(updatedForm);
    }
  };
}

export default formEventHandlers;
