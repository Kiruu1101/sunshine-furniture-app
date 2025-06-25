import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../store/productSlice';
import ProductCard from '../components/ProductCard';
import { useParams, useNavigate } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allProducts, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsByCategory(categoryName));
  }, [dispatch, categoryName]);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      {allProducts.length === 0 ? (
        <p >No products found for this category.</p>
      ) : (
        <div className="row">
          {allProducts.map((product) => (
            <div
              key={product.id || product._id || index}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
            >
              <ProductCard product={product} onClick={() => handleProductClick(product.id)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
