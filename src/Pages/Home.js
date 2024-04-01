import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import TopNavbar from '../Navbars/TopNavbar';
import MainNavbar from '../Navbars/MainNavbar';
import Footer from '../Footer/Footer';
import Productcardsdata from '../Products/Productcardsdata';
import '../CSS/styles.css'; 

const Home = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImage = async (position) => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/imagec/${position}`, { responseType: 'blob' });
        const imageUrl = URL.createObjectURL(response.data);
        setImageUrls(prevImageUrls => {
          // Check if the position already exists in the imageUrls array
          const positionIndex = prevImageUrls.findIndex(url => url.position === position);
          if (positionIndex === -1) {
            // If not, add the new image URL
            return [...prevImageUrls, { position, imageUrl }];
          } else {
            // If yes, replace the existing URL with the new one
            const updatedUrls = [...prevImageUrls];
            updatedUrls[positionIndex] = { position, imageUrl };
            return updatedUrls;
          }
        });
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    // Fetch images for positions 1, 2, and 3
    fetchImage(1);
    fetchImage(2);
    fetchImage(3);

  }, []); // Fetch images only once when the component mounts

  return (
    <div>
       <TopNavbar />
      <MainNavbar />
      <Carousel interval={3000} className="custom-carousel">
        {imageUrls.map((image, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100" src={image.imageUrl} alt={`Slide ${image.position}`} />
            <Carousel.Caption>
              <h3>Slide {image.position} label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className='productdatahome'>
        <Productcardsdata showAll={false} /> {/* Show only 4 products on home page */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
