import React from 'react';
import ProductsList from './pages/productsList/productsList';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ProductDetails from './pages/productDetails/productDetails';

const App = () => {
  return (
    <div className='px-5 py-3 min-h-screen'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductsList />} />
          <Route path="details/:id" element={<ProductDetails/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App