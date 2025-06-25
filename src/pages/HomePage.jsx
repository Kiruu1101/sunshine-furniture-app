// All product Page
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../store/productSlice';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allProducts, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
  <div className="row">
    {allProducts.map(product => (
      <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
        <ProductCard product={product} onClick={() => handleProductClick(product.id)} />
      </div>
    ))}
  </div>
</div>

  );
}
