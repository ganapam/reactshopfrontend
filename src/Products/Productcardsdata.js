import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ProductCard from './ProductsOutsideInfo';
import axios from 'axios';
import '../CSS/styles.css';
import pv from '../assests/vedios/productspage.mp4';

const Productcardsdata = ({ showAll }) => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts = [];
      const maxProducts = showAll ? 10 : 5; // Show all products or only 4 based on the prop

      for (let position = 1; position <= maxProducts; position++) {
        try {
          const responseName = await axios.get(`http://127.0.0.1:8000/product/${position}/display_name`);
          const responseImage = await axios.get(`http://127.0.0.1:8000/product/${position}/image`);

          if (responseName.status === 200 && responseImage.status === 200) {
            fetchedProducts.push({
              id: position,
              name: responseName.data.display_name,
              image_url: `http://127.0.0.1:8000/product/${position}/image`
            });
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.log(`Product data not found for position ${position}`);
          } else {
            console.error(`Error fetching product data for position ${position}:`, error);
          }
        }
      }
      setProducts(fetchedProducts);
    };

    fetchData();
  }, [showAll]); // Fetch data whenever showAll prop changes

  const handleClickForMore = () => {
    navigate("/products");
  };

  return (
    <div className="product-page">
      {location.pathname === "/products" && (
        <video className="video-background" autoPlay muted loop>
          <source src={pv} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <div className="video-content">
        <h1 className='headingproduct'>Products</h1>
        <div className="product-list">
          {products.map(product => (
            <Link
              key={product.id}
              to={product.id === 1 ? "/wire" :
                (product.id === 2 ? "/pipes" :
                  (product.id === 3 ? "/waterpipes" :
                    (product.id === 4 ? "/blubs" :
                      (product.id === 5 ? "/plastictaps" :
                        (product.id === 6 ? "/stelltaps" :
                          `/product/${product.id}`)))))}
            >
              <ProductCard product={product} />
            </Link>
          ))}

          {!showAll && location.pathname === "/" && (
            <div className="empty-card click-for-more" onClick={handleClickForMore}>
              <h3>Click for More Products</h3>
              <p>Explore our full range of products</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Productcardsdata;
