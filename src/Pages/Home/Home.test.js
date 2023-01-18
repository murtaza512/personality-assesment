import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Home from './Home';
import { MemoryRouter as Router } from 'react-router-dom';

describe('Home component', () => {
  test('renders correctly', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    expect(screen.getByText('Assessment Details')).toBeDefined()
    expect(screen.getByText('Enter Your Name')).toBeDefined()
    expect(screen.getByText('Start Assessment')).toBeDefined()
  });

  test('updates name state when user types in text field', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    let name = '';
    const setName = (newName) => {
        name = newName;
    }
    const { rerender } = render(<Home name={name} setName={setName} fetchQuestions={() => {}}/>);
    const nameField = screen.getAllByTestId('name-field');
    nameField[0].value = 'John Doe';
    fireEvent.change(nameField[0]);
    rerender(<Home name={name} setName={setName} fetchQuestions={() => {}}/>);
    expect(nameField[0].value).toBe('John Doe');    
  });

  test('displays error message when user tries to submit empty name', () => {
    render(
      <Router>
        <Home name="" setName={() => {}} fetchQuestions={() => {}} />
      </Router>
    );
    const startAssessmentButton = screen.getByRole('button');

    fireEvent.click(startAssessmentButton);
    expect(screen.getByText('Please Fill your Name')).toBeDefined()
  });

  test('calls fetchQuestions', () => {
    const fetchQuestions = jest.fn();
    const history = { push: jest.fn() };
    render(
      <Router>
        <Home name="John Doe" setName={() => {}} fetchQuestions={fetchQuestions} history={history} />
      </Router>
    );
    const startAssessmentButton = screen.getByRole('button');

    fireEvent.click(startAssessmentButton);
    expect(fetchQuestions).toHaveBeenCalled();
  });
});
