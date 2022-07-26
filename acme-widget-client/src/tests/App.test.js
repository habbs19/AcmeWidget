import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import Main from '../pages/Main'
import { BrowserRouter } from 'react-router-dom';

test('load Main', async () => {
    render(<Main />, { wrapper: BrowserRouter });
    const display = screen.getAllByText('Welcome to Acme Widget Inc.');
    expect(display[0]).toHaveTextContent('Welcome to Acme Widget Inc.');
})
  