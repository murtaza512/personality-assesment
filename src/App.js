import QuestionsService from "./services/questionService"
import { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./Pages/Home/Home";
import Quiz from "./Pages/Quiz/Quiz";
import Result from "./Pages/Result/Result";

function App() {
  const [questions, setQuestions] = useState();
  const [name, setName] = useState();

  const fetchQuestions = async () => {
    const result = await QuestionsService.fetchQuestions();
    if(result.hasError){
      return result.error;
    }else{
      setQuestions(result.data.assessment_questions);
    }
  };

  return (
    <BrowserRouter>
      <div className="app" style={{ backgroundImage: 'url("/ques1.png")' }}>
        <Header />
          <Route path="/" exact>
            <Home
              name={name}
              setName={setName}
              fetchQuestions={fetchQuestions}
            />
          </Route>
          <Route path="/quiz">
            <Quiz
              name={name}
              questions={questions}
              setQuestions={setQuestions}
            />
          </Route>
          <Route path="/result">
            <Result name={name}/>
          </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
