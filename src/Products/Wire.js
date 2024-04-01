import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopNavbar from '../Navbars/TopNavbar';
import MainNavbar from '../Navbars/MainNavbar';
import Footer from '../Footer/Footer';
import ProductCard from './ProductsInsideData'; 
import axios from 'axios'; 

const Wire = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const positions = Array.from({ length: 50 }, (_, index) => index + 1); // Positions from 1 to 100
      const fetchedProducts = [];

      for (let i = 0; i < positions.length; i++) {
        const position = positions[i];
        try {
          const response = await axios.get(`http://127.0.0.1:8000/wire/${position}/`);
          const imageData = await axios.get(`http://127.0.0.1:8000/wire/image/${position}/`, {
            responseType: 'arraybuffer'  // Tell Axios to expect binary data
          });

          const base64Image = btoa(
            new Uint8Array(imageData.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );

          fetchedProducts.push({
            id: position,
            name: response.data.display_name,
            price: response.data.price,
            image_url: `data:image/png;base64,${base64Image}`
          });
        } catch (error) {
          console.error(`Error fetching wire data for position ${position}:`, error);
        }
      }

      setProducts(fetchedProducts);
    };

    fetchData();
  }, []);

  return (
    <div>
      <TopNavbar />
      <MainNavbar />
      <div className="product-page">
        <h1 className='insideproductheading'>Wires</h1>
        <div className="product-list">
                  {/* Wire and Pipes Cards */}
        <div className="productinside">
          <Link to="/pipes" className="productitemssmallcards">
            <h2>Pipes</h2>
          </Link>
          <Link to="/waterpipes" className="productitemssmallcards" >
            <h2>Water Pipes</h2>
          </Link>
          <Link to="/blubs" className="productitemssmallcards" >
            <h2>Blubs</h2>
          </Link>
          <Link to="/plastictaps" className="productitemssmallcards" >
            <h2>Plastic Taps</h2>
          </Link>
          <Link to="/stelltaps" className="productitemssmallcards">
            <h2>Sanitary Taps</h2>
          </Link>
        </div>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wire;
