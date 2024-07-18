import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();
});

// Helper function to render the component within the Router context
// const renderWithRouter = (ui, { route = '/' } = {}) => {
//   window.history.pushState({}, 'Test page', route);
//   return render(ui, { wrapper: BrowserRouter });
// };

describe('App Component', () => {
    it('renders NavBar and ProductList correctly', () => {
        render(<App />);
        expect(screen.getByRole(/nav/i)).toBeInTheDocument();
        expect(screen.getByText(/Collection/i)).toBeInTheDocument();
    });

    
});
