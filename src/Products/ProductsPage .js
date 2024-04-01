import React from 'react';
import TopNavbar from '../Navbars/TopNavbar';
import MainNavbar from '../Navbars/MainNavbar';
import Footer from '../Footer/Footer';
import Productcardsdata from './Productcardsdata';
const ProductsPage = () => {
  return (
    <div>
      <TopNavbar />
      <MainNavbar />
      <Productcardsdata/>
      <Footer />
    </div>
  );
};

export default ProductsPage;
