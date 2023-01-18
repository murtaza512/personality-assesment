import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import countReducer from './../../store/count';
import Quiz from './Quiz';

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

describe('Quiz component', () => {
  test('displays the correct number of questions', () => {
    render(
      <Provider store={store}>
        <Quiz name='John' questions={questions} setQuestions={()=>{}} />
      </Provider>
    );
    expect(screen.getByText('Welcome, John')).toBeDefined();
    expect(screen.getByText('What is your favorite color?')).toBeDefined();
    expect(screen.getByText('Blue')).toBeDefined();
    expect(screen.getByText('Red')).toBeDefined();
  });

  test('displays a loading spinner when questions are not passed in', () => {
    render(
      <Provider store={store}>
        <Quiz name='John' setQuestions={()=>{}} />
      </Provider>
    );
    expect(screen.getByRole('progressbar')).toBeDefined();
  });

  test('dispatching actions updates the store', () => {
    render(
      <Provider store={store}>
        <Quiz name='John' questions={questions} setQuestions={()=>{}} />
      </Provider>
    );
    fireEvent.click(screen.getByText('Red'));
    const introvert = store.getState().count.introvert;
    const extrovert = store.getState().count.extrovert;
    expect(introvert).toBe(1);
    expect(extrovert).toBe(0);
  });
});
