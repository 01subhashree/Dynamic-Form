import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function FormDetail() {
  const { formId } = useParams();
  const form = useSelector((state) =>
    state.forms.forms.find((form) => form.formId === formId)
  );

  if (!form) {
    return <div>Form not found!</div>;
  }

  return (
    <div>
      <h1>Form Detail</h1>
      <div>
        <h1>{form.formTitle}</h1>
        <h4>CreatedAt: {form.createdAt}</h4>
        {form.actions.map((action) => (
          <div key={action.questionId}>
            <h2>{action.question}</h2>
            {action.answerType === "Text" ? (
              <input type="text" />
            ) : (
              <div>
                {action.choices.map((choice, index) => (
                  <div key={index}>
                    {action.answerType === "Multichoice Checkbox" ? (
                      <label>
                        <input type="checkbox" value={choice} />
                        {choice}
                      </label>
                    ) : (
                      <label>
                        <input
                          type="radio"
                          value={choice}
                          name={`question_${action.questionId}`}
                        />
                        {choice}
                      </label>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
