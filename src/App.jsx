import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshIdToken, logout } from './store/authSlice';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import HomePage from './pages/HomePage';
import ContactUs from './pages/ContactUs';
import LoginRegister from './pages/LoginRegister';
import FullPageLoader from './components/FullPageLoader';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartSidebar from './components/CartSidebar';
import OrderPage from './pages/OrderPage';
import OrdersPage from './pages/OrdersPage';
import SearchResults from './components/SearchResults';

export default function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const refreshToken = sessionStorage.getItem('refreshToken');

    if (refreshToken) {
      dispatch(refreshIdToken(refreshToken)).finally(() => setLoading(false));
    } else {
      dispatch(logout());
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) return <FullPageLoader />;

  const routes = [
    { path: '/', element: <Home /> },
    { path: '/allproducts', element: <HomePage /> },
    { path: '/contact', element: <ContactUs /> },
    { path: '/login', element: <LoginRegister /> },
    { path: '/category/:categoryName', element: <CategoryPage /> },
    { path: '/search/:term', element: <SearchResults /> },
    { path: '/product/:id', element: <ProductPage /> },
    { path: '/order', element: <OrderPage />, authRequired: true },
    { path: '/orders', element: <OrdersPage />, authRequired: true },
  ];

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header onCartClick={() => setIsCartOpen(true)} />
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onCheckout={() => setIsCartOpen(false)}
        />
        <main className="flex-grow-1">
          <Routes>
            {routes.map(({ path, element, authRequired }, index) => (
              <Route
                key={index}
                path={path}
                element={
                  authRequired && !user ? <Navigate to="/login" /> : element
                }
              />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
