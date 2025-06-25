import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../store/productSlice';
import ProductCard from '../components/ProductCard';

export default function SearchResults() {
  const { term } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allProducts, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const filterProducts = (products) => {
    const lowerTerm = term.toLowerCase();
    return products.filter((p) =>
      Object.values(p).some((value) =>
        typeof value === 'string' && value.toLowerCase().includes(lowerTerm)
      )
    );
  };

  const matchedProducts = filterProducts(allProducts);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-3">
      <h4>Search Results for: <em>{term}</em></h4>
      {matchedProducts.length === 0 ? (
        <p>No matching products found.</p>
      ) : (
        <div className="row">
          {matchedProducts.map((product) => (
            <div
              key={product.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
            >
              <ProductCard product={product} onClick={() => handleProductClick(product.id)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
