import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import countReducer from './../../store/count';
import Question from './Question';

const store = configureStore({
    reducer: {
        count: countReducer
    },
});

const questions = [
  {
    id: 1,
    text: "What is your favorite color?",
    options: [
      {
        content: "Blue",
        introvertPoint: 0,
        extrovertPoint: 1,
      },
      {
        content: "Red",
        introvertPoint: 1,
        extrovertPoint: 0,
      },
    ]
  },
  {
    id: 2,
    text: "What is your favorite animal?",
    options: [
      {
        content: "Dog",
        introvertPoint: 0,
        extrovertPoint: 1,
      },
      {
        content: "Cat",
        introvertPoint: 1,
        extrovertPoint: 0,
      },
    ]
  }
];

describe('Question component', () => {
  let currQues = 0;

  test('selecting an option and clicking next increases the question number', () => {
    render(
      <Provider store={store}>
        <Question 
          currQues={currQues}
          setCurrQues={(num) => {currQues = num}}
          questions={questions}
          options={questions[currQues] && questions[currQues].options}
        />
      </Provider>
    );
    fireEvent.click(screen.getByText('Red'));
    fireEvent.click(screen.getByText('Next Question'));
    expect(currQues).toBe(1);
    expect(screen.getByText('Question 1 :')).toBeDefined();
    expect(screen.getByText('What is your favorite color?')).toBeDefined();
    expect(screen.getByText('Blue')).toBeDefined();
    expect(screen.getByText('Red')).toBeDefined();
  });

  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Question 
            currQues={currQues}
            setCurrQues={(num) => {currQues = num}}
            questions={questions}
            options={questions[currQues] && questions[currQues].options}
          />
      </Provider>
    );

    expect(screen.getByText('Question 2 :')).toBeDefined();
    expect(screen.getByText('What is your favorite animal?')).toBeDefined();
    expect(screen.getByText('Dog')).toBeDefined();
    expect(screen.getByText('Cat')).toBeDefined();
    expect(screen.getByText('Quit')).toBeDefined();
    expect(screen.getByText('Next Question')).toBeDefined();
  });
});
  
  
