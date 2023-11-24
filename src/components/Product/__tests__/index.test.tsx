import { render, screen } from '@testing-library/react';
import * as ReactQuery from 'react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from '../index';

const queryClient = new ReactQuery.QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

const mockProduct = (
  <ReactQuery.QueryClientProvider client={queryClient}>
    <Router>
      <Product />
    </Router>
  </ReactQuery.QueryClientProvider>
);

describe('Product Component', () => {
  it('renders loading message when data is loading', () => {
    render(mockProduct);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message when data is loading', async () => {
    jest
      .spyOn(ReactQuery, 'useQuery')
      .mockImplementationOnce(
        jest.fn()
          .mockReturnValue({
            data: null,
            isLoading: false,
            error: 'Something went wrong...'
          })
        );

    render(mockProduct);
    expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
  });

  it('renders product data when data is loaded', async () => {
    const mockProductData = {
      id: '1',
      title: 'Test Product',
      image: 'https://test-product-image.com',
      price: 10,
      description: 'Test Product Description'
    };

    jest
      .spyOn(ReactQuery, 'useQuery')
      .mockImplementationOnce(
        jest.fn()
          .mockReturnValue({
            data: mockProductData,
            isLoading: false,
            error: null
          })
        );

    render(mockProduct);
    expect(screen.getByText(`Product with id: ${mockProductData.id} and title ${mockProductData.title}`)).toBeInTheDocument();
  });
});
