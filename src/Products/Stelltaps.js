import React from 'react';
import TopNavbar from '../Navbars/TopNavbar';
import MainNavbar from '../Navbars/MainNavbar';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import ProductCard from './ProductsInsideData'; 
import bristantap from '../assests/IMG/bristantap.jpeg'

const Stelltaps = () => {
const products = [
        {
          id: 1,
          name: "Red Tap",
          price: "NIL",
          image_url: bristantap
        },
    ];
  return (
<div>
      <div>
      <TopNavbar />
      <MainNavbar />
      <div className="product-page">
        <h1 className='insideproductheading'>Sanitary Taps</h1>
        {/* Wire and Pipes Cards */}
        <div className="productinside">
          <Link to="/wire">
            <div className="productitemssmallcards">
              <h2>Wires</h2>
            </div>
          </Link>
          <Link to="/pipes">
            <div className="productitemssmallcards">
              <h2>Pipes</h2>
            </div>
          </Link>
          <Link to="/blubs">
            <div className="productitemssmallcards">
              <h2>Blubs</h2>
            </div>
          </Link>
          <Link to="/waterpipes">
            <div className="productitemssmallcards">
              <h2>Water Pipes</h2>
            </div>
          </Link>
          <Link to="/plastictaps">
            <div className="productitemssmallcards">
              <h2>Plastic Taps</h2>
            </div>
          </Link>
        </div>
        {/* Product Cards */}
        <div className="product-list">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
    </div>
  )
}

export default Stelltaps
