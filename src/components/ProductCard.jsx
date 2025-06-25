import React from 'react';
import '../styles/ProductCard.css';
import {useDispatch} from 'react-redux';
import { addToCart } from '../store/cartSlice'; 

export default function ProductCard({ product, onClick }) {
  const isOutOfStock = product.quantity <= 0;
  const dispatch = useDispatch();
  const [added,setAdded] = React.useState(false);

  return (
    <div className={`product-card card m-3 ${isOutOfStock ? 'out-of-stock' : ''}`} onClick={onClick}>
      <div className="image-container">
        <img src={product.imageUrl} className="card-img-top" alt={product.name} />
        {isOutOfStock && <div className="stock-ribbon">Out of Stock</div>}
      </div>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text price">₹{product.price}</p>
        <p className="card-text quantity">Quantity: {product.quantity}</p>
        <button
          className="btn btn-warning"
          disabled={isOutOfStock}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addToCart(product));
            setAdded(true);
            setTimeout(()=>setAdded(false),1500);
          }}
        >
          {added? '✓ Added':'Add to Cart'}
          
        </button>
      </div>
    </div>
  );
}
