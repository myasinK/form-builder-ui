import InterfaceCollection from "../Interface/InterfaceCollection";
import ElementCollection from "../model/ElementCollection";
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
    const form = new ElementCollection(this.form);
    const updatedForm = form.updateId(targetId, null, updateInstructions);
    this.formSetter(updatedForm);
  };

  addFormComponent = (formComponentType) => {
    if (formComponentType.includes("question")) {
      this.addNewQuestion(formComponentType);
    } else if (formComponentType.includes("standalone")) {
      this.addStandalone(formComponentType);
    }
  };

  // probably will need to merge addStandalone with addNewQuestion
  addStandalone = (type) => {
    const formJson = new ElementCollection(this.form)
      .createNewStandaloneObjectAndAddToForm(type)
      .getJSON();
    this.formSetter(formJson);
  };

  addNewQuestion = (questionType) => {
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
    this.dragInfo.originIndex = originIndex;
    this.dragInfo.parentId = parentId;
    const updatedDragInfo = Object.assign({}, this.dragInfo);
    this.dragInfoSetter(updatedDragInfo);
  };

  handleOnDragOver = (event) => {
    event.preventDefault();
  };

  handleOnChangeTextareaPreview = (responsesId) => {
    const form = new ElementCollection(this.form);
    const setter = this.formSetter;
    return function (userInput) {
      const updateInstructions = {
        propertyName: "answers",
        propertyValue: [{ id: responsesId, value: userInput }],
      };
      const updatedForm = form.updateId(responsesId, null, updateInstructions);
      setter(updatedForm);
    };
  };

  handleOnChangeTextPreview = (responsesId) => {
    const form = new ElementCollection(this.form);
    const setter = this.formSetter;
    return function (userResponseObject) {
      const { id, value } = userResponseObject;
      const { answers } = form.fetchObjectWithId(responsesId)[0];
      const anyExistingResponses = answers.length > 0;
      if (anyExistingResponses) {
        answers.map((el) => {
          if (el.id === id) {
            el.value = value;
            return el;
          } else {
            return el;
          }
        });
      } else {
        answers.push(userResponseObject);
      }
      const updateInstructions = {
        propertyName: "answers",
        propertyValue: answers,
      };
      const updatedForm = form.updateId(responsesId, null, updateInstructions);
      setter(updatedForm);
    };
  };

  handleOnDrop = (event, destinationIndex) => {
    event.preventDefault();
    function checkDestinationIndex(index, array) {
      if (index < 0 || index > array.length) {
        throw Error("bad destination index passed to handledrop()");
      }
    }
    function checkOriginIndex(index, array) {
      if (index < 0 || index > array.length - 1) {
        throw Error("bad origin index passed to handledrop()");
      }
    }
    function checkComponentLength(initialArray, modifiedArray) {
      if (!(modifiedArray.length + 1 === initialArray.length)) {
        throw Error("Error in array manipulation/passing refs");
      }
    }
    const { originIndex, parentId } = this.dragInfo;
    this.dragInfoSetter({ originIndex: null, parentId: null });

    const form = new ElementCollection(this.form);
    const parentObject = Object.assign({}, form.fetchObjectWithId(parentId)[0]);
    const componentList = Object.assign([], parentObject.componentList);

    try {
      checkDestinationIndex(destinationIndex, componentList);
      checkOriginIndex(originIndex, componentList);
    } catch (error) {
      console.log(error);
    }

    const clonedObjectThatIsBeingMoved = Object.assign(
      {},
      componentList[originIndex]
    );
    componentList.splice(destinationIndex, 0, clonedObjectThatIsBeingMoved); // this array is gaining an extra element here

    let updatedComponentList;
    if (destinationIndex < originIndex) {
      updatedComponentList = componentList.filter(
        (el, index) => !(index === originIndex + 1)
      );
    } else if (destinationIndex > originIndex) {
      updatedComponentList = componentList.filter(
        (el, index) => !(index === originIndex)
      );
    } else if (destinationIndex === originIndex) {
      updatedComponentList = componentList.filter(
        (el, index) => !(index === originIndex)
      );
    }

    try {
      checkComponentLength(componentList, updatedComponentList);
    } catch (error) {
      console.log(error);
    }

    let updatedForm;
    if (form.id === parentId) {
      updatedForm = form.setComponentList(updatedComponentList);
    } else {
      updatedForm = form.updateId(parentId, null, {
        propertyName: "componentList",
        propertyValue: Object.assign([], updatedComponentList),
      });
    }

    this.formSetter(updatedForm);
  };
}

export default formEventHandlers;
