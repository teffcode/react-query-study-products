import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Products from './components/Products';
import Product from './components/Product';

import { IProduct } from './components/Products/types.d';

import './App.css';

const getProducts = async (queryKey: any): Promise<IProduct[]> => {
  const response = await fetch(`https://api.escuelajs.co/api/v1/${queryKey}`);
  const products = await response.json();
  return products;
}

function App(): JSX.Element {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: async ({ queryKey }) => await getProducts(queryKey)
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
