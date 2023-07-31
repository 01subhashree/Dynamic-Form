import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Addquestion from "../addQuestion/Addquestion";
import { useDispatch } from "react-redux";
import { addForm } from "../../redux/FormSlice";
import style from "./CreateForm.module.css";
import axios from "axios";
import { getLocalData, setLocalData } from "../../localStroageData";

export default function CreateForm() {
  const [title, setTitle] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [question, setQuestion] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [answerType, setAnswerType] = useState("");
  const [choices, setChoices] = useState("");

  const navigate = useNavigate();

  const submitHandler = () => {
    if (title !== "") {
      setPopUp(true);
    }
  };

  const dispatch = useDispatch();

  const addQuestionHandler = async () => {
    if (questionTitle.trim() === "" || answerType.trim() === "") {
      // Show an error or validation message
      return;
    }

    const newQuestion = {
      questionId: Date.now().toString(), // Generate a unique questionId (you can use a more robust method in production)
      questionTitle,
      answerType,
      choices: choices.split("\n").map((choice) => choice.trim()),
    };

    // dispatch(addForm({ formTitle: title, question: newQuestion }));

    const formId = Date.now().toString();
    const createdAt = new Date().toLocaleDateString();
    const formURL = `https://dynamicform.com/formid=${formId}`;

    const newForm = {
      formId,
      createdAt,
      formURL,
      formTitle: title,
      questions: [newQuestion],
    };
    // Get the existing data from local storage
    // const existingData = JSON.parse(localStorage.getItem("FormData"));
    const existingData = getLocalData();
    console.log("excitingdata", existingData);

    // Append the new form data to the existing data
    const updatedData = [...existingData, newForm];

    // Save the updated data back to local storage
    setLocalData(updatedData);

    dispatch(addForm(newForm));

    setQuestion("");
    setTitle("");
    setPopUp(false);
    setAnswerType("");
    setChoices("");
  };

  const BtnStyle = {
    backgroundColor: "#664217",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "4px",
    fontWeight: "bold",
    margin: "2rem",
  };

  const MyStyle = {
    backgroundColor: "wheat",
    border: "1px solid",
  };

  console.log(question);

  return (
    <div className={style.CreateFormScreen}>
      <h1>Create Form</h1>
      <Button
        style={BtnStyle}
        variant="contained"
        onClick={() => navigate("/")}
      >
        Go back to HomePage
      </Button>

      <div>
        <div className={style.addFormDiv}>
          <TextField
            variant="filled"
            style={MyStyle}
            label="Enter form title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></TextField>
          <Button style={BtnStyle} variant="contained" onClick={submitHandler}>
            Add Question
          </Button>
        </div>
        {popUp && (
          <Addquestion
            addQuestionHandler={addQuestionHandler}
            setAnswerType={setAnswerType}
            setChoices={setChoices}
            setQuestionTitle={setQuestionTitle}
            popUp={popUp}
            choices={choices}
            answerType={answerType}
          />
        )}
      </div>
    </div>
  );
}
