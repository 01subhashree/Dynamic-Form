import React from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteForm } from "../../redux/FormSlice";

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

  return (
    <div>
      <h1>FormPage</h1>

      <Button variant="contained" onClick={() => navigate("/form")}>
        Create Form
      </Button>
      <div>
        {selector &&
          selector.map((form) => (
            <div key={form.formId}>
              <h1>{form.formTitle}</h1>
              <h4>{form.createdAt}</h4>
              <Link to={`/form/${form.formId}`}>{form.formURL}</Link>
              <div>
                <Button onClick={() => deleteHandler(form.formId)}>
                  Delete
                </Button>
                <Button onClick={() => editHandler(form.formId)}>Edit</Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
