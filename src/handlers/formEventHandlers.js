import InterfaceCollection from "../Interface/InterfaceCollection";

// const addNewQuestion = (form, formSetter) => {
//   return function (questionType) {
//     console.log("a;ldsfj;ldsaf;ldsajf");
//     return;
//   };
// };

// const addResponseOption = (form, formSetter) => {
//   return function (
//     targetId // targetId is the id of the responses object that the newly created response option will be inserted to
//   ) {
//     // logic:
//     // fetch responses with targetId
//     // use interface to add a new option (new payload)
//     // update targetid with new payload
//     const responses = form.fetchDeleteId(targetId, "f");
//     const responsesInterface = new InterfaceResponses(responses.getAll());
//     const updatedResponses = responsesInterface.loadResponse().getAll();
//     form.updateId(targetId, updatedResponses);
//     const updatedForm = Object.assign(new InterfaceForm(), form);
//     formSetter(updatedForm);
//   };
// };

// const clearForm = (form, formSetter) => {
//   return function () {
//     form.componentList = [];
//     const updatedForm = Object.assign(new InterfaceForm(), form);
//     formSetter(updatedForm);
//   };
// };

// const startNewForm = (formSetter) => {
//   return function (name = "base") {
//     const newForm = new InterfaceForm({
//       parentId: name,
//       componentType: "form",
//     });
//     formSetter(newForm);
//   };
// };

class formEventHandlers {
  constructor(form, formSetter) {
    this.form =
      form === null
        ? new InterfaceCollection()
        : Object.assign(new InterfaceCollection(), form);
    this.formSetter = formSetter;
  }

  addResponse = (responsesId) => {
    const responsesObj = this.form.fetchId(responsesId);
    console.log("fetched object", responsesObj[0]);
    const updatedResponses = this.form.addNewResponseToResponses(
      responsesObj[0]
    );
    const updatedForm = this.form.updateId(responsesId, updatedResponses, null);
    this.formSetter(updatedForm);
  };

  delete = (targetId) => {
    const updatedForm = this.form.deleteId(targetId);
    this.formSetter(updatedForm);
  };

  updateNamedMemberWithValue = (targetId, updateInstructions) => {
    const updatedForm = this.form.updateId(targetId, null, updateInstructions);
    this.formSetter(updatedForm);
    console.log(targetId, updateInstructions);
  };

  addNewQuestion = (questionType) => {
    this.form.initializeNewQuestionObject(questionType);
    const form = Object.assign(new InterfaceCollection(), this.form);
    this.formSetter(form);
  };

  startNewForm = (name = "Intake") => {
    const newForm = new InterfaceCollection({
      parentId: name,
      componentType: "form",
    });
    this.formSetter(newForm);
  };

  clearForm = () => {
    this.formSetter(null);
  };
}

export default formEventHandlers;
