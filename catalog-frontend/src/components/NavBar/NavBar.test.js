import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from './NavBar'; // Adjust the import path based on your project structure
// import { faBars, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Mock FontAwesomeIcon to simplify testing
// jest.mock('@fortawesome/react-fontawesome', () => ({
//   FontAwesomeIcon: ({ icon }) => <span>{icon.iconName}</span>
// }));

describe('NavBar Component', () => {
  const mockSetSearchText = jest.fn();

  test('renders without crashing', () => {
    render(<NavBar setSearchText={mockSetSearchText} />);
    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('SHOP')).toBeInTheDocument();
    expect(screen.getByText('MAGAZINE')).toBeInTheDocument();
    expect(screen.getByText('LOGIN')).toBeInTheDocument();
    // expect(screen.getByText('bars')).toBeInTheDocument(); // FontAwesome icon mock
    // expect(screen.getByText('search')).toBeInTheDocument(); // FontAwesome icon mock
    // expect(screen.getByText('shopping-cart')).toBeInTheDocument(); // FontAwesome icon mock
  });

  test('input field accepts text', () => {
    render(<NavBar setSearchText={mockSetSearchText} />);
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'test query' } });
    expect(input.value).toBe('test query');
  });

  test('search function triggers on key up', () => {
    render(<NavBar setSearchText={mockSetSearchText} />);
    const input = screen.getByPlaceholderText('Search');
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });
    expect(mockSetSearchText).toHaveBeenCalled();
  });

//   test('clicking the search button triggers the search function', () => {
//     render(<NavBar setSearchText={mockSetSearchText} />);
//     const button = screen.getAllByRole('button')[0];
//     fireEvent.click(button);
//     expect(mockSetSearchText).toHaveBeenCalled();
//   });

  // test('shopping cart button click does not produce errors', () => {
  //   render(<NavBar setSearchText={mockSetSearchText} />);
  //   const button = screen.getAllByRole('button')[1];
  //   expect(() => fireEvent.click(button)).not.toThrow();
  // });

  // Additional tests can be added here for accessibility, HTML validation, etc.
});
