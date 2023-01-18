import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage component', () => {
  test('displays the passed in message', () => {
    render(<ErrorMessage>Please select an option</ErrorMessage>);
    expect(screen.getByText('Please select an option')).toBeDefined();
  });
});
