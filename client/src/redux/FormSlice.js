// Data structure

// const formData = [{
//   formId: 1453245,
//   createdAt: 29-7-2023,
//   formURL: "https://reactform.com/formid=1453245",
//   formTitle: "from 1",
//   actions: [{
//     questionId: 234253,
//     question: "How to create a react app ?",
//     answer: "",
//   },....]
// },
// {...............}
// ,{.............}
// ];

import { createSlice } from "@reduxjs/toolkit";

const formsSlice = createSlice({
  name: "forms",
  initialState: {
    forms: [],
  },
  reducers: {
    getForm: (state, action) => {
      console.log(action.payload);
      state.forms = action.payload.map((form) => {
        return {
          formId: form.formId,
          formTitle: form.formTitle,
          formURL: form.formURL,
          questions: form.questions,
        };
      });
    },

    addForm: (state, action) => {
      state.forms.push(action.payload);
      // state.forms = action.payload;
    },
    deleteForm: (state, action) => {
      const formId = action.payload;
      state.forms = state.forms.filter((form) => form.formId !== formId);
    },
    editForm: (state, action) => {
      console.log(action.payload);
      const { formId, newTitle } = action.payload;
      const form = state.forms.find((form) => form.formId === formId);
      form.formTitle = newTitle;
    },
  },
});

export const { addForm, getForm, deleteForm, editForm } = formsSlice.actions;
export default formsSlice.reducer;
