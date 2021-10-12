import ElementCollection from "../model/ElementCollection";
import PrimaryElement from "../model/PrimaryElement";
import InterfaceElement from "./InterfaceElement";
import { definitions } from "../model/FormComponentTypes";

class InterfaceCollection extends ElementCollection {
  getAll = () => {
    // very shitty method name
    return {
      componentType: this.componentType,
      componentDescriptor: this.componentDescriptor,
      parentId: this.parentId,
      componentList: this.componentList,
      id: this.id,
    };
  };

  pushPayloadToTargetWithId = (payload, targetId = this.id, beginAt = this) => {
    function pushToComponentListWithId(
      whatToPush,
      targetListId = targetId,
      startingCollection = beginAt
    ) {
      if (startingCollection.id === targetListId) {
        startingCollection.componentList.push(whatToPush);
        return startingCollection;
      } else {
        startingCollection.componentList.map((el) => {
          if (el.componentList) {
            return pushToComponentListWithId(whatToPush, targetListId, el);
          } else {
            return el;
          }
        });
        return startingCollection;
      }
    }

    let origin = Object.assign({}, this.getAll());
    return pushToComponentListWithId(payload, targetId, origin);
  };

  fetchId = (targetId) => {
    function fetch(targetId, origin, action = "f", fetchedObj = []) {
      const hasTargetObject = origin.componentList
        .map((el) => el.id === targetId)
        .reduce((prev, current) => {
          return prev || current;
        }, false);
      if (hasTargetObject) {
        fetchedObj = origin.componentList.filter(function (el) {
          return el.id === targetId ? true : false;
        });
        return fetchedObj;
      } else {
        origin.componentList.map(function (el) {
          if (el.componentList) {
            fetchedObj = fetch(targetId, el, action, fetchedObj);
          }
          return el;
        });
      }
      return fetchedObj;
    }

    return fetch(targetId, this.getAll());
  };

  deleteId = (targetId) => {
    function ejectIdFromCollection(targetId, startingCollection) {
      const hasTargetObject = startingCollection.componentList
        .map((el) => el.id === targetId)
        .reduce((prev, current) => {
          return prev || current;
        }, false);
      if (hasTargetObject) {
        startingCollection.componentList =
          startingCollection.componentList.filter(function (el) {
            if (el.id === targetId) {
              return false;
            } else {
              return true;
            }
          });
      } else {
        startingCollection.componentList = startingCollection.componentList.map(
          function (el) {
            if (el.componentList) {
              el = ejectIdFromCollection(targetId, el);
              return el;
            } else {
              return el;
            }
          }
        );
      }
      return startingCollection;
    }
    let origin = Object.assign({}, this.getAll());
    return ejectIdFromCollection(targetId, origin);
  };

  setParentId = (pI, resetId = true) => {
    this.parentId = pI;
    if (resetId) {
      this.resetId();
    }
    return this;
  };
  resetId = (id = null) => {
    this.id =
      id || `${this.parentId}-${this.componentType}-${this.generateRandN()}`;
  };

  updateId = (targetId, newObject, updateInstructions) => {
    function updateAtId(
      id,
      updatedObject,
      startingCollection,
      updateInstructions // supply json with propertyName & propertyValue
    ) {
      // if newObject is null and updateInstructions exist, property value of property name is being updated
      // if updateInstructions is null and newObject exists, object at targetId is being replaced with newObject
      const updatingPropertyAtId = () => {
        return updatedObject === null && !(updateInstructions === null);
      };
      let updatedComponentList = startingCollection.componentList.map((el) => {
        if (el.id === id) {
          if (updatingPropertyAtId()) {
            const { propertyName, propertyValue } = updateInstructions;
            el[propertyName] = propertyValue;
            return el;
          } else {
            return updatedObject;
          }
        } else {
          if (el.componentList) {
            return updateAtId(id, updatedObject, el, updateInstructions);
          } else {
            return el;
          }
        }
      });
      startingCollection.componentList = updatedComponentList;
      return { ...startingCollection };
    }
    let origin = Object.assign({}, this.getAll());
    let updatedCollection = updateAtId(
      targetId,
      newObject,
      origin,
      updateInstructions
    );
    return Object.assign(new InterfaceCollection(), updatedCollection);
  };

  // Form-related methods

  createInputDisplayElement = (
    endUserHtmlInputType = this.componentDescriptor.endUserHtmlInputType
  ) => {
    const componentType = null;
    const componentDescriptor = null;
    const htmlInnerText = null;
    const htmlValueAttr = null;
    const htmlDefaultValue = null;
    const htmlClassAttr = `display-only-${endUserHtmlInputType}`;
    const htmlPlaceholderAttr = null;
    const htmlStyleAttr = null;
    const htmlNameAttr = null;
    const parentId = null;
    const htmlTagName = endUserHtmlInputType;
    const conditional = null;
    const draggable = null;
    const id = null;
    return new PrimaryElement({
      componentType,
      componentDescriptor,
      htmlInnerText,
      htmlValueAttr,
      htmlDefaultValue,
      htmlClassAttr,
      htmlPlaceholderAttr,
      htmlStyleAttr,
      htmlNameAttr,
      parentId,
      htmlTagName,
      conditional,
      draggable,
      id,
    });
  };

  // createInputLabelElement = (parent, endUserHtmlInputType) => {
  //   const componentType = `${endUserHtmlInputType}-response-option-label`;
  //   // const componentDescriptor = parentDescriptor;
  //   const htmlValueAttr = "Click to edit";
  //   const htmlInnerText = null; // may need this for textareas down the line
  //   const htmlDefaultValue = null;
  //   const htmlClassAttr = `response-label-${endUserHtmlInputType}`;
  //   const htmlPlaceholderAttr = null;
  //   const htmlStyleAttr = null;
  //   const htmlNameAttr = null;
  //   const parentId = parent;
  //   const htmlTagName =
  //     endUserHtmlInputType === "textarea" ? null : endUserHtmlInputType;
  //   const conditional = null;
  //   const draggable = null;
  //   const id = false;
  //   return new PrimaryElement({
  //     componentType,
  //     htmlInnerText,
  //     htmlValueAttr,
  //     htmlDefaultValue,
  //     htmlClassAttr,
  //     htmlPlaceholderAttr,
  //     htmlStyleAttr,
  //     htmlNameAttr,
  //     parentId,
  //     htmlTagName,
  //     conditional,
  //     draggable,
  //     id,
  //   });
  // };

  createPrompt = (parent) => {
    const memberObject = {
      componentDescriptor: null,
      componentType: "prompt-editable",
      htmlInnerText: "Click to edit",
      htmlValueAttr: null,
      htmlDefaultValue: null,
      htmlClassAttr: "class-not-specified",
      htmlPlaceholderAttr: "placeholder-not-specified",
      htmlStyleAttr: null,
      htmlNameAttr: null,
      parentId: parent,
      htmlTagName: "paragraph",
      conditional: false,
      draggable: false,
      id: null,
    };
    return new InterfaceElement(memberObject).getElement();
  };

  createQuestionObject = (parentId, componentType) => {
    const newObject = new InterfaceCollection({
      componentType,
      parentId,
    }).getAll();
    return newObject;
  };

  createElCollection = (parentId, componentType) => {
    const newObject = new InterfaceCollection({
      parentId,
      componentType,
    }).getAll();
    return newObject;
  };

  createResponsesObjects = (parentId, responsesTypeArray) => {
    const responsesObjects = responsesTypeArray.map((r) =>
      new InterfaceCollection({ parentId, componentType: r }).getAll()
    );
    return responsesObjects; // returns an array with 1 element unless it's for a tabular response, in which case it will have 2 elements. Each element is a collection object. This does not add anything to componentList
  };

  addNewResponseToResponses = (responsesObject) => {
    if (
      !responsesObject.componentDescriptor.endUserHtmlInputType.includes(
        "textarea"
      )
    ) {
      const blankResponseLabel = new InterfaceElement({
        parentId: responsesObject.id,
        componentType: `${responsesObject.componentType}-label`,
        htmlClassAttr: "undecided",
        htmlInnerText: "Click to edit",
        htmlValueAttr: null,
        htmlTagName: "span",
      }).getElement();
      responsesObject.componentList.push(blankResponseLabel);
    }
    return Object.assign({}, responsesObject);
  };

  initializeResponsesObjects = (arrayWithResponsesObjects) => {
    // this function expects an array of "responses" objects
    const generateLabelElement = (responsesObj) => {
      const isNotTextarea = !(
        responsesObj.componentDescriptor.endUserHtmlInputType === "textarea"
      );
      if (isNotTextarea) {
        const responseLabel = new InterfaceElement({
          componentType: "response-label",
          htmlTagName: "span",
          parentId: null,
          htmlInnerText: "Click to edit",
          htmlPlaceholderAttr: null,
        }).getElement();
        responsesObj.componentList.push(responseLabel);
      } else {
        return responsesObj;
      }
    };
    return arrayWithResponsesObjects.map((responsesObject) =>
      generateLabelElement(responsesObject)
    );
  };

  addLabelToResponsesObject = (responsesObject) => {
    const isTextarea =
      responsesObject.componentDescriptor.endUserHtmlInputType === "textarea";
    if (isTextarea) {
      return responsesObject;
    } else {
      const responseLabel = new InterfaceElement({
        componentType: `response-label-for-id-${responsesObject.id}`,
        htmlTagName: "span",
        parentId: null,
        htmlInnerText: "Click to edit",
        htmlPlaceholderAttr: null,
      }).getElement();
      responsesObject.componentList.push(responseLabel);
      return Object.assign({}, responsesObject);
    }
  };

  initializeNewStandaloneObject = (type, obj = false) => {
    const parentId = this.id;
    const standalone = this.createElCollection(parentId, type);
    if (obj) standalone.componentList.push(obj);
    this.componentList.push(standalone);
    return this;
  };

  initializeNewQuestionObject = (questionType) => {
    const parent = this.id;
    const newQuestion = this.createQuestionObject(parent, questionType);
    const newPrompt = this.createPrompt(this.id);
    // the following variable is storing an array
    const newResponses = this.createResponsesObjects(
      newQuestion.id,
      definitions.responsesTypes[questionType] // array
    );
    const initResponses = newResponses.map((r) =>
      this.addLabelToResponsesObject(r)
    );
    newQuestion.componentList.push(newPrompt, ...initResponses);
    this.componentList.push(newQuestion);
    return this;
  };
}

export default InterfaceCollection;
