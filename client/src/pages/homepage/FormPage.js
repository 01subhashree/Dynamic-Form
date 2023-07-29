import React from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteForm } from "../../redux/FormSlice";
import style from "./FormPage.module.css";

export default function FormPage() {
  const navigate = useNavigate();
  const selector = useSelector((state) => state.forms.forms);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(deleteForm(id));
  };

  const editHandler = (id) => {
    navigate(`/form/${id}`);
  };

  const buttonStyle = {
    backgroundColor: "rgb(197 77 120)",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "4px",
    fontWeight: "bold",
  };

  return (
    <div className={style.formScreen}>
      <div className={style.formdiv}>
        <h1>FormPage</h1>

        <Button
          style={buttonStyle}
          variant="contained"
          onClick={() => navigate("/form")}
        >
          Create Form
        </Button>
      </div>
      <div className={style.formDashboard}>
        {selector &&
          selector.map((form) => (
            <div key={form.formId} className={style.formDetailPage}>
              <h1>{form.formTitle}</h1>
              <h4>{form.createdAt}</h4>
              <Link
                className={style.formDetailPage_link}
                to={`/form/${form.formId}`}
              >
                {form.formURL}
              </Link>
              <div className={style.formDetailPage_buttons}>
                <Button
                  style={buttonStyle}
                  onClick={() => deleteHandler(form.formId)}
                >
                  Delete
                </Button>
                <Button
                  style={buttonStyle}
                  onClick={() => editHandler(form.formId)}
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
