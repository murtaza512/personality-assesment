import { Button } from "@material-ui/core";
import { useState} from "react";
import { useDispatch} from "react-redux"
import { useHistory } from "react-router";
import "./Question.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { incrementIntrovert, incrementExtrovert } from "../../store/count";

const Question = ({
  currQues = 0,
  setCurrQues,
  questions = [],
  options,
  setQuestions,
}) => {
  const [selected, setSelected] = useState(-1);
  const [error, setError] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();


  const handleCheck = (i, introvertPoint, extrovertPoint) => {
    setSelected(i);
    dispatch(incrementIntrovert(introvertPoint));
    dispatch(incrementExtrovert(extrovertPoint));
    setError(false);
  };

  const handleNext = () => {
    if (selected === -1) {
      setError("Please select an option first");
    } else if (currQues > 3) {
        history.push("/result");
    } else {
        setCurrQues(currQues + 1);
        setSelected(-1);
    }
  };

  const handleQuit = () => {
    setCurrQues(0);
    setQuestions();
  };
  const displayOption = (option, i) => {
    return(
      <button
        className={`singleOption ${selected === i ? 'select' : ''}`}
        key={i}
        onClick={() => handleCheck(i, option.introvertPoint, option.extrovertPoint)}
        disabled={false}
      >
        {option.content}
      </button>
    )
  }

  return (
    <div className="question">
      <h1>Question { currQues + 1 } :</h1>
      { questions && <div className="singleQuestion">
        { questions[currQues] && <h2> { questions[currQues].text } </h2> }
        <div className="options">
          { error && <ErrorMessage> {error} </ErrorMessage> }
          { options && options.map((option, i) => (displayOption(option, i))) }
        </div>
        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/"
            onClick={() => handleQuit()}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={ { width: 185 } }
            onClick={ handleNext }
          >
            {currQues > 3 ? "Submit" : "Next Question"}
          </Button>
        </div>
      </div>}
    </div>
  );
};

export default Question;