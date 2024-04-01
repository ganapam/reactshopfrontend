import React from 'react';
import '../CSS/styles.css'
const Products = ({ product }) => {
  return (
    <div className="product-card">
    <img src={product.image_url} alt={product.name} />
    <h2>{product.name}</h2>
    <p>Price: ₹{product.price}</p>
  </div>
  );
};

export default Products;