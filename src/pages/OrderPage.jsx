import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { incrementQty, decrementQty, removeFromCart, clearCart } from '../store/cartSlice';
import { updateProductQuantity } from '../store/productSlice';
import { updateAddress } from '../store/authSlice';
import '../styles/OrderPage.css';

const BASE_DB = 'https://furniture-app-by-kiran-default-rtdb.firebaseio.com';

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, address } = useSelector((state) => state.auth);
  const items = Object.values(useSelector((state) => state.cart.items));

  const [formAddress, setFormAddress] = useState(address || '');
  const [placing, setPlacing] = useState(false);

  const total = items.reduce((sum, { product, qty }) => sum + product.price * qty, 0);

  // ✅ Fetch address using REST API
  useEffect(() => {
    const fetchAddress = async () => {
      if (!user) return;
      try {
        const res = await fetch(`${BASE_DB}/users/${user.uid}/address.json`);
        if (!res.ok) throw new Error('Failed to fetch address');
        const savedAddress = await res.json();
        if (savedAddress) {
          setFormAddress(savedAddress);
          dispatch(updateAddress(savedAddress));
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };

    fetchAddress();
  }, [user, dispatch]);

  const handlePlaceOrder = async () => {
    if (!formAddress.trim()) return alert('Please enter a valid address.');
    if (items.length === 0) return alert('Your cart is empty.');

    try {
      setPlacing(true);
      dispatch(updateAddress(formAddress));

      // ✅ Save address using REST
      await fetch(`${BASE_DB}/users/${user.uid}/address.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formAddress),
      });

      const order = {
        userId: user.uid,
        address: formAddress,
        items,
        total,
        paymentMode: 'COD',
        status: 'Placed',
        createdAt: new Date().toISOString(),
      };

      // ✅ Save order using REST
      await fetch(`${BASE_DB}/orders/${user.uid}.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      // ✅ Update product quantity (use existing thunk which uses REST)
      for (const { product, qty } of items) {
        const remaining = product.quantity - qty;
        dispatch(updateProductQuantity({ productId: product.id, newQuantity: remaining }));
      }

      dispatch(clearCart());
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      console.error(error);
      alert('Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="order-container">
      <h2>Confirm & Place Your Order</h2>

      {/* Address */}
      <div className="order-section">
        <h4>Shipping Address</h4>
        <textarea
          rows="3"
          placeholder="Enter full address"
          value={formAddress}
          onChange={(e) => setFormAddress(e.target.value)}
        />
      </div>

      {/* Cart Items */}
      <div className="order-section">
        <h4>Items in Cart</h4>
        {items.length === 0 ? (
          <p>No items to show.</p>
        ) : (
          items.map(({ product, qty }) => (
            <div className="order-item" key={product.id}>
              <img src={product.imageUrl} alt={product.name} />
              <div className="info">
                <p><strong>{product.name}</strong></p>
                <p>Price: ₹{product.price}</p>
                <div className="qty">
                  <button onClick={() => dispatch(decrementQty(product.id))} disabled={qty <= 1}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => dispatch(incrementQty(product.id))} disabled={qty >= product.quantity}>+</button>
                </div>
                <button onClick={() => dispatch(removeFromCart(product.id))}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Payment */}
      <div className="order-section">
        <h4>Payment Method</h4>
        <p><strong>Cash on Delivery</strong> only</p>
      </div>

      {/* Total & Place Order */}
      <div className="order-section summary">
        <h4>Total: ₹{total}</h4>
        <button
          className="btn btn-primary"
          disabled={placing}
          onClick={handlePlaceOrder}
        >
          {placing ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
