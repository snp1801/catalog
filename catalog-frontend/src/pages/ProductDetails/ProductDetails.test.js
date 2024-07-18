import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import { useLocation } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// Mock useLocation
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
}));

const mockProduct = {
    title: "Sample Product",
    type: "Gadget",
    description: "This is a sample description of a product.",
    price: "99.99",
    color: ["red", "blue"],
    productImg: ["img1.jpg", "img2.jpg"]
};

describe('ProductDetails Component', () => {
    beforeEach(() => {
        useLocation.mockImplementation(() => ({
            state: { product: mockProduct }
        }));
    });

    test('renders without crashing', () => {
        render(<BrowserRouter><ProductDetails /></BrowserRouter>);
        expect(screen.getByText("Sample Product")).toBeInTheDocument();
        expect(screen.getByText("Gadget")).toBeInTheDocument();
        expect(screen.getByText("This is a sample description of a product.")).toBeInTheDocument();
        expect(screen.getByTestId('price')).toBeInTheDocument();
    });

    test('carousel displays images correctly', () => {
        render(<BrowserRouter><ProductDetails /></BrowserRouter>);
        expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', '../img1.jpg');
        expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', '../img2.jpg');
    });

    test('color selection updates UI', async () => {
        render(<ProductDetails />);
        const blueButton = screen.getByRole('button', { name: /blue/i });
        userEvent.click(blueButton); // Assuming the first button is for the color red
        // screen.debug();
        // logRoles(prodDetails)

        // Use Testing Library queries to check for the icon
        // Assuming the icon is visible to the user as text or accessible label
        await screen.findByTestId('check-icon'); // If you've added a `data-testid` to the icon
        expect(screen.getByTestId('check-icon')).toHaveAttribute('values','blue');
    });


    test('Buy Now button is present', () => {
        render(<BrowserRouter><ProductDetails /></BrowserRouter>);
        const buyButton = screen.getByRole('button', { name: /buy now/i });
        expect(buyButton).toBeInTheDocument(); // Checks if the button is in the document
    });
});