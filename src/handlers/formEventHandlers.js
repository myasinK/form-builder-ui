import InterfaceCollection from "../Interface/InterfaceCollection";
import ElementCollection from "../model/ElementCollection";
import PrimaryElement from "../model/PrimaryElement";

class formEventHandlers {
  constructor(
    form,
    setForm,
    dragInfo,
    setDragInfo,
    sections,
    setSections,
    triggers,
    setTriggers,
    triggeredIds,
    setTriggeredIds
  ) {
    this.form =
      form === null ? new InterfaceCollection() : Object.assign({}, form);
    this.formSetter = setForm;
    this.dragInfo = dragInfo;
    this.dragInfoSetter = setDragInfo;
    this.sections = sections;
    this.setSections = setSections;
    this.setTriggeredIds = setTriggeredIds;
    this.setTriggers = setTriggers;
    this.triggers = triggers;
    this.triggeredIds = triggeredIds;
  }

  handleSetTriggerForQuestion = (targetQId, triggerObject) => {
    // object will have members qid, rid, trigger
    const { qId, rId, trigger } = triggerObject;
    const form = new ElementCollection(this.form);

    if (trigger) {
      const updatedForm = form.updateId(targetQId, null, {
        propertyName: "triggeredBy",
        propertyValue: Object.assign({}, triggerObject),
      });
      this.formSetter(updatedForm);
    } else {
      const updatedForm = form.updateId(targetQId, null, {
        propertyName: "triggeredBy",
        propertyValue: false,
      });
      this.formSetter(updatedForm);
    }
  };

  handleTriggerSelection = (event, object) => {
    // object will have members qid, rid, trigger
    const { qId, rId, trigger } = object;
    const setTriggers = this.setTriggers;
    if (trigger) {
      const hasTriggerBeenSetForThis =
        this.triggers.filter((t) => t.qId === qId && t.rId === rId).length ===
        1;
      if (hasTriggerBeenSetForThis) {
        const updatedTriggers = this.triggers.map((t) => {
          if (t.qId === qId && t.rId === rId) {
            t = Object.assign({}, object);
            return t;
          } else {
            return t;
          }
        });
        setTriggers(updatedTriggers);
      } else {
        const triggers = Object.assign([], this.triggers);
        triggers.push(object);
        setTriggers(triggers);
      }
    } else {
      const triggers = Object.assign([], this.triggers);
      const updatedTriggers = triggers.filter((t) => !(t.qId === qId));
      setTriggers(updatedTriggers);
    }
  };

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
    let formCollection = new ElementCollection(this.form);
    let updatedForm =
      formCollection.createNewResponseAndAddToResponses(responsesId);
    this.formSetter(updatedForm);
  };

  delete = (targetId, parentId = false, optionalFlag = null) => {
    const formCollection = new ElementCollection(this.form);
    let updatedForm = formCollection.deleteId(targetId);
    if (parentId) {
      const ANSWERS = "answers";
      // retrieve parent object
      const responsesObject = formCollection.fetchObjectWithId(parentId)[0];
      // extract property with name as defined in optionalFlag
      const answers = Object.assign([], responsesObject[ANSWERS]);
      // if optionalflag is "answers" delete object with id=targetId in answers
      const updatedAnswers = answers.filter((el) => !(el.id === targetId));
      // update parent object with new answers
      responsesObject[ANSWERS] = updatedAnswers;
      // update form with parent object
      // delete targetId
      const form = new ElementCollection(updatedForm).updateId(
        parentId,
        responsesObject
      );
      // update form in state
      this.formSetter(form);
    } else {
      this.formSetter(updatedForm);
    }
  };

  handleUpdateNominalScoreValue = (event, targetId, propertyName) => {
    const propertyValue = event.target.value;
    const instructions = {
      propertyName,
      propertyValue,
    };
    this.updateNamedMemberWithValue(targetId, instructions);
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
    const updatedDragInfo = { originIndex, parentId };
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
      let { answers } = form.fetchObjectWithId(responsesId)[0];
      const anyExistingResponses = answers.length > 0;
      const hasBeenAnsweredBefore =
        answers.filter((el) => el.id === id).length === 1;
      if (anyExistingResponses) {
        if (hasBeenAnsweredBefore) {
          answers = answers.map((el) => {
            if (el.id === id) {
              el.value = value;
              return el;
            } else {
              return el;
            }
          });
        } else {
          // if there are answers but this specific one hasn't been answered
          answers.push(userResponseObject);
        }
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

  handleOnChangeCheckboxPreview = (responsesId, scoreValue = false) => {
    const form = new ElementCollection(this.form);
    const setter = this.formSetter;
    let { answers, sectionName } = form.fetchObjectWithId(responsesId)[0];
    return function (userInputObject) {
      userInputObject["sectionName"] = sectionName;
      const thisHasBeenAnsweredBefore =
        answers.filter((el) => el.id === userInputObject.id).length > 0;
      let updatedAnswers = [];

      if (thisHasBeenAnsweredBefore) {
        updatedAnswers = answers.map((el) => {
          if (el.id === userInputObject.id) {
            el.value = userInputObject.value;
            el.score = userInputObject.score;
            el["sectionName"] = sectionName;
            return Object.assign({}, el);
          } else {
            return el;
          }
        });
      } else {
        answers.push(Object.assign({}, userInputObject));
        updatedAnswers = Object.assign([], answers);
      }

      const updateInstructions = {
        propertyName: "answers",
        propertyValue: updatedAnswers,
      };
      const updatedForm = form.updateId(responsesId, null, updateInstructions);
      setter(updatedForm);
    };
  };

  handleOnChangeRadioPreview = (responsesId, questionId) => {
    const form = new ElementCollection(this.form);
    const formSetter = this.formSetter;
    const triggeredIds = Object.assign([], this.triggeredIds);
    const setTriggeredIds = this.setTriggeredIds;
    const triggers = Object.assign([], this.triggers);
    return function (userInputObject) {
      const { sectionName } = form.fetchObjectWithId(responsesId)[0];
      userInputObject["sectionName"] = sectionName;
      const updateInstructions = {
        propertyName: "answers",
        propertyValue: [Object.assign({}, userInputObject)],
      };
      const updatedForm = form.updateId(responsesId, null, updateInstructions);
      if (
        triggers.filter(
          (t) => t.qId === questionId && t.rId === userInputObject.id
        ).length === 1
      ) {
        triggeredIds.push({ qId: questionId, rId: userInputObject.id });
        const updatedTriggeredIds = Object.assign([], triggeredIds);
        setTriggeredIds(updatedTriggeredIds);
      }
      formSetter(updatedForm);
    };
  };

  handleOnChangeInputTabularPreview = (rowsId) => {
    const form = new ElementCollection(this.form);
    const setter = this.formSetter;
    return function (userInputObject) {
      const { answers, sectionName } = form.fetchObjectWithId(rowsId)[0];
      // const { uid, inputType, rowId, columnId, value, score } = userInputObject;
      userInputObject["sectionName"] = sectionName && sectionName;
      const hasThisBeenAnsweredAlready = (userInputObject, answers) => {
        if (userInputObject.inputType === "radio") {
          return (
            answers.filter((answer) => answer.rowId === userInputObject.rowId)
              .length === 1
          );
        } else {
          return (
            answers.filter((answer) => answer.uid === userInputObject.uid)
              .length === 1
          );
        }
      };

      let updatedAnswers;
      if (hasThisBeenAnsweredAlready(userInputObject, answers)) {
        updatedAnswers = answers.map((answer) => {
          if (
            userInputObject.inputType === "radio" &&
            answer.rowId === userInputObject.rowId
          ) {
            answer = Object.assign({}, userInputObject);
            return answer;
          } else if (
            ["text", "checkbox"].includes(userInputObject.inputType) &&
            answer.uid === userInputObject.uid
          ) {
            answer = Object.assign({}, userInputObject);
            return answer;
          } else {
            return answer;
          }
        });
      } else {
        answers.push(userInputObject);
        updatedAnswers = Object.assign([], answers);
      }

      const updateInstructions = {
        propertyName: "answers",
        propertyValue: Object.assign([], updatedAnswers),
      };

      const updatedForm = form.updateId(rowsId, null, updateInstructions);
      setter(updatedForm);
    };
  };

  getAnswers = () => {
    return this.form.componentList
      .filter((el) => el.componentType.includes("question"))
      .map((el) => el.componentList[1].answers);
  };

  generateScore = (form) => {
    const scoredQuestionsOnly = form.componentList.filter(
      (el) =>
        el.componentType.includes("question") && el.componentList[1].scored
    );
    const responsesObjects = scoredQuestionsOnly.map(
      (el) => el.componentList[1]
    );

    const sectionNamesDefined = responsesObjects
      .map((el) => {
        if (el.sectionName) {
          return el.sectionName;
        } else {
          return false;
        }
      })
      .filter((el) => !(el === false));

    let score = { total: 0 };
    sectionNamesDefined.forEach((name) => {
      Object.defineProperty(score, "sectionName", {
        value: name,
        writable: true,
      });
    });
    return sectionNamesDefined;
  };

  setSectionName = (responsesId, sectionName) => {
    const form = new ElementCollection(this.form);
    const targetResponsesObject = form.fetchObjectWithId(responsesId)[0];
    targetResponsesObject.sectionName = sectionName;
    const updatedAnswers = targetResponsesObject.answers.map((el) => {
      el["sectionName"] = sectionName || false;
      return el;
    });
    targetResponsesObject.answers = updatedAnswers;
    const updatedForm = form.updateId(responsesId, targetResponsesObject);

    const sections = Object.assign([], this.sections);
    const sectionIds = sections.map((s) => s.id);
    if (!sectionIds.includes(responsesId)) {
      sections.push({ id: responsesId, sectionName });
      this.setSections(Object.assign([], sections));
    } else {
      const updatedSections = sections.map((section) => {
        if (section.id === responsesId) {
          section.sectionName = sectionName;
          return section;
        } else return section;
      });
      this.setSections(Object.assign([], updatedSections));
    }

    this.formSetter(updatedForm);
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
