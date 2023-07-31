import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import style from "./FormDetail.module.css";

export default function FormDetail() {
  const { formId } = useParams();
  const navigate = useNavigate();

  const form = useSelector((state) =>
    state.forms.forms.find((form) => form.formId === formId)
  );

  if (!form) {
    return <div>Form not found!</div>;
  }

  console.log("formDetail", form);
  const myStyle = {
    backgroundColor: "rgb(197 77 120)",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "4px",
    fontWeight: "bold",
    marginButtom: "3rem",
  };

  return (
    <div className={style.formDetailPage}>
      <h1>Form Detail</h1>
      <Button style={myStyle} onClick={() => navigate("/")}>
        Go Back to HomePage
      </Button>
      <div className={style.formDetailPage_div}>
        <h1>{form.formTitle}</h1>
        <h4>CreatedAt: {form.createdAt}</h4>
        {form.questions.map((action) => (
          <div key={action.questionId}>
            <h2>{action.question}</h2>
            <div>
              {action.choices.map((ele, index) => (
                <ul key={index}>
                  <li>{ele}</li>
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
