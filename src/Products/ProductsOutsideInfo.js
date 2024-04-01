import React from 'react';
import '../CSS/styles.css'; // Ensure correct path to your CSS file

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image_url} alt={product.name} />
      <h2>{product.name}</h2>
    </div>
  );
};

export default ProductCard;
