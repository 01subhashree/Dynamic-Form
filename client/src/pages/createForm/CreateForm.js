import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Addquestion from "../addQuestion/Addquestion";
import { useDispatch } from "react-redux";
import { addForm } from "../../redux/FormSlice";
import style from "./CreateForm.module.css";

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

  const addQuestionHandler = () => {
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
    dispatch(addForm({ formTitle: title, question: newQuestion }));

    setQuestion("");
    setTitle("");
    setPopUp(false);
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
