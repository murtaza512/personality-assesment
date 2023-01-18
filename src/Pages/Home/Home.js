import { Button, TextField } from "@material-ui/core";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./Home.css";

const Home = ({ name, setName, fetchQuestions }) => {
  const [error, setError] = useState('');

  const history = useHistory();
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleSubmit = async () => {
    if (!name) {
      setError('Please Fill your Name');
    } else {
      const errorMessage = await fetchQuestions();
      if (isMountedRef.current && errorMessage) {
        setError(errorMessage)
      } else {
        history.push("/quiz"); 
        setError('');
      }
    }
  };

  return (
    <div className="content">
      <div className="settings">
        <span style={{ fontSize: 30 }}>Assessment Details</span>
        <div className="settings__select">
          {error && <ErrorMessage>{ error }</ErrorMessage>}
          <label htmlFor="name-field">Enter Your Name</label>
          <TextField
            className="name-field"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            data-testid="name-field"
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={ handleSubmit }
          >
            Start Assessment
          </Button>
        </div>
      </div>
      <img src="/quiz.svg" className="banner" alt="quiz app" />
    </div>
  );
};

export default Home;
