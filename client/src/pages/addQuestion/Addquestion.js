import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import style from "./Addquestion.module.css";

export default function Addquestion({
  popUp,
  answerType,
  setAnswerType,
  setQuestionTitle,
  addQuestionHandler,
  choices,
  setChoices,
}) {
  const paperStyle = {
    backgroundColor: "#f0f0f0",
    border: "2px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    maxWidth: "60vw",
  };

  const dialogContentStyle = {
    display: "flex",
    flex: "unset",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  };

  const BtnStyle = {
    padding: "1rem 3rem",
    backgroundColor: "#9f175b",
  };
  return (
    <div>
      <Dialog
        open={popUp}
        className={style.mainDiv}
        PaperProps={{ style: paperStyle }}
      >
        <div className={style.wrapper}>
          <DialogTitle>Add Question</DialogTitle>
          <DialogContent
            className={style.dialogContainerDiv}
            style={dialogContentStyle}
          >
            <TextField
              variant="filled"
              fullWidth
              autoFocus
              margin="dense"
              label="Question"
              onChange={(e) => setQuestionTitle(e.target.value)}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="answer-type-label" variant="filled">
                Answer Type
              </InputLabel>
              <Select
                labelId="answer-type-label"
                value={answerType}
                onChange={(e) => setAnswerType(e.target.value)}
              >
                <MenuItem value="Text">Text</MenuItem>
                <MenuItem value="Multichoice Checkbox">
                  Multichoice Checkbox
                </MenuItem>
                <MenuItem value="Single Select radio">
                  Single Select radio
                </MenuItem>
              </Select>
            </FormControl>
            {(answerType === "Multichoice Checkbox" ||
              answerType === "Single Select radio") && (
              <TextField
                multiline
                fullWidth
                rows={4}
                margin="dense"
                label="Choices (One per line)"
                value={choices}
                onChange={(e) => setChoices(e.target.value)}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={addQuestionHandler}
              variant="contained"
              style={BtnStyle}
            >
              Add
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
