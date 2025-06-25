import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../styles/OrdersPage.css';

const BASE_DB = 'https://furniture-app-by-kiran-default-rtdb.firebaseio.com';

const OrdersPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${BASE_DB}/orders/${user.uid}.json`);
        if (!response.ok) throw new Error('Failed to fetch orders');

        const data = await response.json();
        if (data) {
          const orderList = Object.entries(data).map(([id, order]) => ({
            id,
            ...order,
          }));
          setOrders(orderList.reverse());
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) return <div className="orders-container">Loading orders...</div>;

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h4>Status: <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></h4>
              <p><strong>Placed on:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Payment:</strong> {order.paymentMode}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
            </div>
            <div className="order-body">
              <h5>Shipping Address</h5>
              <p>{order.address}</p>
              <h5>Items</h5>
              <ul className="order-items-list">
                {order.items.map(({ product, qty }) => (
                  <li key={product.id} className="order-item">
                    <img src={product.imageUrl} alt={product.name} />
                    <div>
                      <p><strong>{product.name}</strong></p>
                      <p>Qty: {qty}</p>
                      <p>₹{product.price * qty}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
