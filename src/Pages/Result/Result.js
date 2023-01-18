import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from 'react-redux';
import "./Result.css";

const Result = ({ name}) => {
  const history = useHistory();
  const { introvert, extrovert } = useSelector((state) => state.count);

  useEffect(() => {
    if (!name) {
      history.push("/");
    }
  }, [name, history]);

  return (
    <div className="result">
      <span className="title">{name}, You are {introvert > extrovert ? 'Introvert' : 'Extrovert'}</span>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ alignSelf: "center", marginTop: 20 }}
        href="/"
      >
        Go to homepage
      </Button>
    </div>
  );
};

export default Result;
