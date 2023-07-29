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
    addForm: (state, action) => {
      const { formTitle, question } = action.payload;
      const formId = Date.now().toString(); // Generate a unique formId (you can use a more robust method in production)
      const createdAt = new Date().toLocaleDateString(); // Get the current date
      const formURL = `https://reactform.com/formid=${formId}`;

      state.forms.push({
        formId,
        createdAt,
        formURL,
        formTitle,
        actions: [question],
      });
    },
    deleteForm: (state, action) => {
      const formId = action.payload;
      state.forms = state.forms.filter((form) => form.formId !== formId);
    },
    editForm: (state, action) => {
      const { formId, newTitle } = action.payload;
      const form = state.forms.find((form) => form.formId === formId);
      form.formTitle = newTitle;
    },
  },
});

export const { addForm, addQuestion, deleteForm, editForm } =
  formsSlice.actions;
export default formsSlice.reducer;
