import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import TopNavbar from '../Navbars/TopNavbar';
import MainNavbar from '../Navbars/MainNavbar';
import Footer from '../Footer/Footer';
import ShopImage from '../assests/IMG/shop.jpg'; // Assuming you have an image for your shop
import '../CSS/About.css'; // Import the external CSS file

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div className="about-container">
      <TopNavbar />
      <MainNavbar />
      <div className="about-content">
        <Row gutter={[16, 16]} align="middle" justify="center">
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <img
              src={ShopImage}
              alt="Our Electrical Shop"
              className="about-image"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="about-text">
              <Title className="about-title">About Our Shop</Title>
              <Paragraph className="about-paragraph">
                We are a leading electrical shop with over 10 years of experience in the industry. We pride ourselves on providing high-quality products and excellent customer service.
              </Paragraph>
              <Paragraph className="about-paragraph">
                Our shop offers a wide range of electrical items including wiring, pipes, bulbs, and more. We carefully check the quality and quantity of each item to ensure customer satisfaction. Whether you are looking for items for home use, farming, or industrial purposes, we have you covered.
              </Paragraph>
              <Paragraph className="about-paragraph">
                Don't exceed your budget! We make sure all items are available at competitive prices without compromising on quality.
              </Paragraph>
              <div className="button-container">
                <Link to="/products">
                  <Button type="primary">View Products</Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default About;
