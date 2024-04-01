import React from 'react'
import TopNavbar from '../Navbars/TopNavbar';
import MainNavbar from '../Navbars/MainNavbar';
import Footer from '../Footer/Footer';
import Productcardsdata from '../Products/Productcardsdata';
const Product = () => {
  return (
    <div>
      <TopNavbar/>
      <MainNavbar/>
      <Productcardsdata showAll={true} />
      <Footer/>
    </div>
  )
}

export default Product
