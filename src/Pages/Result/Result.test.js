import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import countReducer from './../../store/count';
import Result from './Result';

const store = configureStore({
    reducer: {
        count: countReducer
    },
});

describe('Result component', () => {
  test('renders without crashing', () => {
    act(() => {
      store.dispatch({type:'count/incrementIntrovert', payload: 5});
      store.dispatch({type:'count/incrementExtrovert', payload: 3});
    });
    render(
      <Provider store={store}>
        <Result name="John" store={store} />
      </Provider>  
      );
    expect(screen.getByText('John, You are Introvert')).toBeDefined();
  });

  test('redirects to homepage if no name is provided', () => {
    act(() => {
      store.dispatch({type:'count/incrementIntrovert', payload: 5});
      store.dispatch({type:'count/incrementExtrovert', payload: 3});
    });
    const { introvert, extrovert } = store.getState().count;
    expect(introvert > extrovert ? 'Introvert' : 'Extrovert').toBe('Introvert');
  });

  test('clicking the button redirects to homepage', () => {
    act(() => {
      store.dispatch({type:'count/incrementIntrovert', payload: 5});
      store.dispatch({type:'count/incrementExtrovert', payload: 3});
    });
    render(
      <Provider store={store}>
        <Result name="John" store={store} />
      </Provider>  
    );
    fireEvent.click(screen.getByText('Go to homepage'));
    expect(window.location.pathname).toBe('/');
  });
});
