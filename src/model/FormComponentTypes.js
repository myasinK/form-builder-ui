const VALID_FORM_TYPES = {
  QTEXT: "question-text",
  RTEXT: "responses-text",
  QTEXTTABULAR: "question-text-tabular",
  RTEXTTABULAR_ROWS: "responses-text-tabular-rows",
  RTEXTTABULAR_COLUMNS: "responses-text-tabular-columns",
  QTEXTAREA: "question-textarea",
  RTEXTAREA: "responses-textarea",
  QRADIO: "question-radio",
  RRADIO: "responses-radio",
  QRADIOTABULAR: "question-radio-tabular",
  RRADIOTABULAR_ROWS: "responses-radio-tabular-rows",
  RRADIOTABULAR_COLUMNS: "responses-radio-tabular-columns",
  QCHECKBOX: "question-checkbox",
  RCHECKBOX: "responses-checkbox",
  QCHECKBOXTABULAR: "question-checkbox-tabular",
  RCHECKBOXTABULAR_ROWS: "responses-checkbox-tabular-rows",
  RCHECKBOXTABULAR_COLUMNS: "responses-checkbox-tabular-columns",
  PARAGRAPH: "paragraph",
  HEADER1: "header1",
};

const definitions = {};

definitions.formComponentTypes = {
  QTEXT: "question-text",
  QTEXTTABULAR: "question-text-tabular",
  QTEXTAREA: "question-textarea",
  QRADIO: "question-radio",
  QRADIOTABULAR: "question-radio-tabular",
  QCHECKBOX: "question-checkbox",
  QCHECKBOXTABULAR: "question-checkbox-tabular",
};

definitions.formComponentInnerText = {
  [definitions.formComponentTypes.QTEXT]: "Short Alphanumeric",
  [definitions.formComponentTypes.QTEXTTABULAR]:
    "Short Alphanumeric (tabulated)",
  [definitions.formComponentTypes.QTEXTAREA]: "Long Alphanumeric",
  [definitions.formComponentTypes.QRADIO]: "Multiple choices 1",
  [definitions.formComponentTypes.QRADIOTABULAR]:
    "Multiple choices 1 (tabulated)",
  [definitions.formComponentTypes.QCHECKBOX]: "Multiple choices",
  [definitions.formComponentTypes.QCHECKBOXTABULAR]:
    "Multiple choices (tabulated)",
};

definitions.responsesTypes = {
  [definitions.formComponentTypes.QTEXT]: ["responses-text"],
  [definitions.formComponentTypes.QTEXTTABULAR]: [
    "responses-text-tabular-rows",
    "responses-text-tabular-columns",
  ],
  [definitions.formComponentTypes.QTEXTAREA]: ["responses-textarea"],
  [definitions.formComponentTypes.QRADIO]: ["responses-radio"],
  [definitions.formComponentTypes.QRADIOTABULAR]: [
    "responses-radio-tabular-rows",
    "responses-radio-tabular-columns",
  ],
  [definitions.formComponentTypes.QCHECKBOX]: ["responses-checkbox"],
  [definitions.formComponentTypes.QCHECKBOXTABULAR]: [
    "responses-checkbox-tabular-rows",
    "responses-checkbox-tabular-columns",
  ],
};

const possibleResponses = Object.values(definitions.responsesTypes).flat(
  Infinity
);

const possibleQuestionTypes = Object.values(definitions.formComponentTypes);

const allValidTypes = [...possibleQuestionTypes, ...possibleResponses];

const returnInputType = (typeString) => {
  const typeStringDeconstructed = typeString.split("-");
  if (typeString === null) {
    return null;
  } else if (["question", "responses"].includes(typeStringDeconstructed[0])) {
    return typeStringDeconstructed[1];
  } else {
    return null;
  }
};

definitions.endUserHtmlInputType = {};

allValidTypes.map((type) => {
  definitions.endUserHtmlInputType[type] = returnInputType(type);
  return type;
});

// const FORM_TYPE_TEXT_DESCRIPTION = {
//   [VALID_FORM_TYPES.QTEXT]: "Short text input",
//   [VALID_FORM_TYPES.QTEXTTABULAR]: "Short text input (tabulated)",
//   [VALID_FORM_TYPES.QCHECKBOX]: "Multiple choice",
//   [VALID_FORM_TYPES.QCHECKBOXTABULAR]: "Multiple choice (tabulated)",
//   [VALID_FORM_TYPES.QRADIO]: "Multiple choice (pick one)",
//   [VALID_FORM_TYPES.QRADIOTABULAR]: "Multiple choice (pick one - tabulated)",
//   [VALID_FORM_TYPES.QTEXTAREA]: "Long text input",
// };

// const LOGICAL_CHILDREN = {
//   FORM: [...Object.values(VALID_FORM_TYPES), "standalone-element"],
//   [VALID_FORM_TYPES.QTEXT]: ["standalone-element", "responses"],
//   [VALID_FORM_TYPES.QTEXTAREA]: ["standalone-element", "responses"],
//   [VALID_FORM_TYPES.QRADIO]: ["standalone-element", "responses"],
//   [VALID_FORM_TYPES.QRADIOTABULAR]: ["standalone-element", "responses"],
//   [VALID_FORM_TYPES.QCHECKBOX]: ["standalone-element", "responses"],
//   [VALID_FORM_TYPES.QCHECKBOXTABULAR]: ["standalone-element", "responses"],
//   RESPONSES: ["standalone-element"],
// };

// const LOGICAL_RESPONSES_COMPONENT_TYPE = {
//   FORM: null,
//   [VALID_FORM_TYPES.QTEXT]: VALID_FORM_TYPES.RTEXT,
//   [VALID_FORM_TYPES.QTEXTTABULAR]: [
//     VALID_FORM_TYPES.RTEXTTABULAR_ROWS,
//     VALID_FORM_TYPES.RTEXTTABULAR_COLUMNS,
//   ],
//   [VALID_FORM_TYPES.RTEXT]: null,
//   [VALID_FORM_TYPES.RTEXTTABULAR_COLUMNS]: null,
//   [VALID_FORM_TYPES.RTEXTTABULAR_ROWS]: null,
//   [VALID_FORM_TYPES.QTEXTAREA]: VALID_FORM_TYPES.RTEXTAREA,
//   [VALID_FORM_TYPES.RTEXTAREA]: null,
//   [VALID_FORM_TYPES.QRADIO]: VALID_FORM_TYPES.RRADIO,
//   [VALID_FORM_TYPES.RRADIO]: null,
//   [VALID_FORM_TYPES.QRADIOTABULAR]: [
//     VALID_FORM_TYPES.RRADIOTABULAR_ROWS,
//     VALID_FORM_TYPES.RRADIOTABULAR_COLUMNS,
//   ],
//   [VALID_FORM_TYPES.QCHECKBOXTABULAR]: [
//     VALID_FORM_TYPES.RCHECKBOXTABULAR_ROWS,
//     VALID_FORM_TYPES.RCHECKBOXTABULAR_COLUMNS,
//   ],
//   [VALID_FORM_TYPES.RRADIOTABULAR_COLUMNS]: null,
//   [VALID_FORM_TYPES.RRADIOTABULAR_ROWS]: null,
//   [VALID_FORM_TYPES.QCHECKBOX]: VALID_FORM_TYPES.RCHECKBOX,
//   [VALID_FORM_TYPES.RCHECKBOX]: null,
//   [VALID_FORM_TYPES.RCHECKBOXTABULAR_COLUMNS]: null,
//   [VALID_FORM_TYPES.RCHECKBOXTABULAR_ROWS]: null,
//   RESPONSES: null,
// };

export default VALID_FORM_TYPES;
export { definitions };
