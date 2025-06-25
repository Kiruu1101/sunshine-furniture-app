// src/pages/ProductPage.jsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../store/productSlice';
import { addToCart } from '../store/cartSlice';
import '../styles/ProductPage.css';
import { FaCheckCircle, FaShippingFast, FaUndoAlt, FaStar } from 'react-icons/fa';
import AOS from 'aos';

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { allProducts, loading } = useSelector(state => state.products);

  useEffect(() => {
    AOS.init({ duration: 800 });
    if (allProducts.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, allProducts.length]);

  const product = allProducts.find(p => p.id === id);

  if (loading || !product) {
    return (
      <div className="text-center my-5 loader-container">
        <div className="loader"></div>
        <p className="mt-3">Loading product details...</p>
      </div>
    );
  }

  const [added,setAdded] = React.useState(false);

  return (
    <div className="product-page container py-5">
      <div className="row g-5" data-aos="fade-up">
        <div className="col-md-6">
          <img src={product.imageUrl} alt={product.name} className="img-fluid rounded shadow-sm" />
        </div>
        <div className="col-md-6">
          <h2 className="mb-2">{product.name}</h2>
          <p className="text-muted">Category: <strong>{product.category}</strong> / {product.subCategory}</p>
          <h4 className="text-success fw-bold mb-3">₹{product.price.toLocaleString()}</h4>
          <p>{product.description}</p>
          <p><strong>Available Quantity:</strong> <span className={product.quantity <= 0 ? 'text-danger fw-bold' : 'fw-semibold'}>{product.quantity <= 0 ? 'Out of Stock' : product.quantity}</span></p>
          <button className="btn btn-lg btn-warning" 
              disabled={product.quantity <= 0}
              onClick={(e) => {
                      e.stopPropagation();
                      dispatch(addToCart(product));
                      setAdded(true);
                      setTimeout(()=>setAdded(false),1500);
                }}
          >
            {product.quantity <= 0 
            ? "Out of Stock"
            : added
            ? "✓ Added"
            : "🛒 Add to Cart"}
            
          </button>

          {/* 📋 Specifications */}
          <div className="mt-4 bg-light p-3 rounded shadow-sm" data-aos="fade-left">
            <h5 className="text-primary">📋 Product Specifications</h5>
            <p>
              This high-quality {product.name} is designed with precision and care using the finest materials. Perfect for daily use, it blends style and durability to give you a long-lasting product experience.
              The ergonomic design and elegant finish make it an excellent addition to your collection, whether it's for home, office, or gifting purposes.
              <br /><br />
              Manufactured following top safety and environmental standards, it ensures both sustainability and comfort. Our commitment to excellence is reflected in every detail – from the stitching to the final polish.
            </p>
          </div>
        </div>
      </div>

      <hr className="my-5" />

      {/* 💬 Testimonials */}
      <section id="testimonials" className="mt-5" data-aos="fade-up">
        <h4 className="mb-4">💬 What Our Customers Say</h4>
        <blockquote>
          “Both shop and online experience were seamless. The sofa is so comfortable!”
          <footer className="blockquote-footer">Kiran C., Mumbai</footer>
        </blockquote>
        <blockquote>
          “Loved the shopping experience! The team helped me redesign my living room beautifully.”
          <footer className="blockquote-footer">Aarti S., Pune</footer>
        </blockquote>
        <blockquote>
          “Their quality and delivery time is unmatched. Highly recommended!”
          <footer className="blockquote-footer">Rajeev M., Bangalore</footer>
        </blockquote>
      </section>

      {/* ⭐ Reviews */}
      <section className="mt-5" data-aos="zoom-in">
        <h4 className="mb-3">⭐ Customer Reviews</h4>
        <ul className="list-unstyled">
          <li><FaStar className="text-warning" /> <FaStar className="text-warning" /> <FaStar className="text-warning" /> <FaStar className="text-warning" /> – Value for money!</li>
          <li><FaStar className="text-warning" /> <FaStar className="text-warning" /> <FaStar className="text-warning" /> – Good but delivery was a day late.</li>
        </ul>
      </section>

      {/* 📦 Warranty & Delivery */}
      <section className="mt-5" data-aos="fade-up">
        <h4 className="mb-3">📦 Warranty & Delivery</h4>
        <ul className="list-unstyled">
          <li><FaCheckCircle className="text-success me-2" />1-year warranty on manufacturing defects.</li>
          <li><FaShippingFast className="text-primary me-2" />Free delivery within 5–7 working days.</li>
          <li><FaUndoAlt className="text-danger me-2" />10-day return policy (T&C apply).</li>
        </ul>
      </section>
    </div>
  );
}
