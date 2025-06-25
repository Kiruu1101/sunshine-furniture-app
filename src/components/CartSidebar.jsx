import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQty, decrementQty, removeFromCart, clearCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/CartSidebar.css';

export default function CartSidebar({ isOpen, onClose, onCheckout }) {
  const items = Object.values(useSelector(s => s.cart.items));
  const total = items.reduce((sum, { product, qty }) => sum + product.price * qty, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onCheckout();
    navigate('/order'); 
    };  

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h4>Shopping Cart</h4>
        <button onClick={onClose}>&times;</button>
      </div>
      <div className="cart-items">
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : items.map(({ product, qty }) => (
          <div key={product.id} className="cart-item">
            <img src={product.imageUrl} alt={product.name} />
            <div className="details">
              <h6>{product.name}</h6>
              <div className="qty-controls">
                <button onClick={() => dispatch(decrementQty(product.id))} disabled={qty <=1}>−</button>
                <span>{qty}</span>
                <button onClick={() => dispatch(incrementQty(product.id))} disabled={qty >= product.quantity}>+</button>
              </div>
              <p>₹{product.price * qty}</p>
              <button className="btn-link" onClick={() => dispatch(removeFromCart(product.id))}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      {items.length > 0 && (
        <div className="cart-footer">
          <h5>Total: ₹{total}</h5>
          <button className="btn btn-success btn-lg w-100" onClick={handleCheckout}>
            Checkout
          </button>
          <button className="btn btn-secondary w-100 mt-2" onClick={onClose}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
