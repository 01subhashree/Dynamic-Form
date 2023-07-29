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

export default function Addquestion({
  setPopUp,
  popUp,
  answerType,
  setAnswerType,
  setQuestionTitle,
  addQuestionHandler,
  choices,
  setChoices,
}) {
  return (
    <div>
      <Dialog open={popUp}>
        <DialogTitle>
          <span>Add Question</span>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Question"
            fullWidth
            onChange={(e) => setQuestionTitle(e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="answer-type-label">Answer Type</InputLabel>
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
              rows={4}
              fullWidth
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
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
