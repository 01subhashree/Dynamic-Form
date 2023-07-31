import { useState } from "react";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteForm, editForm, getForm } from "../../redux/FormSlice";
import style from "./FormPage.module.css";
import { useEffect } from "react";
import { getLocalData, setLocalData } from "../../localStroageData";

export default function FormPage() {
  const [isEdit, setIsEdit] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const navigate = useNavigate();
  const forms = useSelector((state) => state.forms.forms);
  const dispatch = useDispatch();
  const [updatedId, setUpdatedId] = useState("");

  useEffect(() => {
    const formData = getLocalData();

    dispatch(getForm(formData));
    console.log("localData", formData);
  }, []);

  const deleteHandler = (formId) => {
    dispatch(deleteForm(formId));
    // Get the current data from local storage
    const existingData = getLocalData();

    // Filter out the form with the given formId
    const updatedData = existingData.filter((form) => form.formId !== formId);

    // Save the updated data back to local storage
    setLocalData(updatedData);
  };

  const editHandler = (title, id) => {
    setIsEdit(true);
    setUpdatedTitle(title);
    setUpdatedId(id);
  };

  const buttonStyle = {
    backgroundColor: "rgb(197, 77, 120)",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "4px",
    fontWeight: "bold",
  };

  const updateHandler = (formId) => {
    dispatch(editForm({ formId: formId, newTitle: updatedTitle }));

    // Get the current data from local storage
    const existingData = getLocalData();

    // Find the form with the given formId in the existing data
    const updatedData = existingData.map((form) => {
      if (form.formId === formId) {
        return { ...form, formTitle: updatedTitle };
      }
      return form;
    });

    // Save the updated data back to local storage
    setLocalData(updatedData);
    setIsEdit(false);
    setUpdatedTitle("");
  };

  console.log("form data", forms);

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
        {forms &&
          forms.map((form) => (
            <div key={form.formId} className={style.formDetailPage}>
              {isEdit && form.formId === updatedId ? (
                <div className={style.editForm_screen}>
                  <input
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                  <Button
                    style={buttonStyle}
                    onClick={() => updateHandler(form.formId)}
                  >
                    Update
                  </Button>
                </div>
              ) : (
                <h1>{form.formTitle}</h1>
              )}
              <h4>{form.createdAt}</h4>
              <Link
                className={style.formDetailPage_link}
                to={`/form/${form.formId}`}
              >
                <span>{form.formURL}</span>
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
                  onClick={() => editHandler(form.formTitle, form.formId)}
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
