import React from 'react';
import '../styles/Header.css';
import { FaShoppingCart, FaUser, FaMapMarkerAlt, FaTags } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction } from '../store/authSlice';

export default function Header({ onCartClick }) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.user);

  const categories = {
    'Living Room': ['Sofa', 'Coffee Table', 'Bookshelf'],
    'Bedroom': ['Wardrobe', 'Bed', 'Table'],
    'Dining Room': ['Dining Set', 'Chairs', 'Dinning Table'],
    'Office': ['Work Desk', 'Office Chair', 'Study Table'],
    'Kids': ['Bunk Bed', 'Toy Storage', 'Single Bed'],
    'Plastic Chairs': ['Armless', 'With Armrest'],
    'Utility': ['Shoe Rack', 'Stools'],
    'Premium': ['Recliners', 'Designer Sofas'],
    'Mattress': ['Single', 'Queen', 'King']
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/search/${searchTerm.trim().toLowerCase()}`);
    }
  };

  const handleLogout = () => {
    dispatch(logoutAction()); // Just dispatch from slice now
  };

  return (
    <header className="site-header">
      {/* Top Bar */}
      <div className="top-bar d-flex justify-content-end">
        <span className="top-link me-3" onClick={() => navigate('/contact')}>Franchise Enquiry</span>
        <span className="top-link me-3" onClick={() => navigate('/contact')}>Warranty Registration</span>
        <span className="top-link me-3" onClick={() => navigate('/orders')}>Track Your Order</span>
        <span className="top-link" onClick={() => navigate('/#stores')}>Our Store</span>
      </div>

      {/* Main Navbar */}
      <div className="main-nav">
        <div className="logo" onClick={() => navigate('/')}>
          🪑<span>SUNSHINE</span><br /><span>Furniture Store</span>
        </div>

        <div className="search">
          <input
            type="text"
            placeholder="Search for Sofas, Chairs, Tables..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="nav-links d-flex align-items-center">
          <button className="top-link me-3 nav-button" onClick={() => navigate('/allproducts')}>
            <FaTags className="me-1" />Best Deals
          </button>
          <button className="top-link me-3 nav-button" onClick={() => navigate('/#stores')}>
            <FaMapMarkerAlt />
          </button>
          <button className="top-link me-3 nav-button" onClick={onCartClick}>
            <FaShoppingCart />
          </button>

          {isAuth ? (
            <>
              <span className="me-2">{isAuth.email}</span>
              <button className="top-link me-3 nav-button" onClick={handleLogout}>
                <FaUser className="me-1" />Logout
              </button>
            </>
          ) : (
            <button className="top-link me-3 nav-button" onClick={() => navigate('/login')}>
              <FaUser className="me-1" />Login / Register
            </button>
          )}
        </div>
      </div>

      {/* Category Menu */}
      <div className="category-menu">
        {Object.keys(categories).map((category, idx) => (
          <div className="cat-item" key={idx}>
            <span>{category}</span>
            <div className="mega-dropdown">
              {categories[category].map((sub, subIdx) => (
                <a
                  href=""
                  key={subIdx}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/category/${sub.toLowerCase().replace(/\s+/g, '-')}`);
                  }}
                >
                  Buy {sub}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </header>
  );
}
