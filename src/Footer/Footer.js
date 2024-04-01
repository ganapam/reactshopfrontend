import React from 'react';
import { AiOutlineHome, AiOutlineAppstore, AiOutlineMail, AiOutlinePhone, AiOutlineTwitter, AiOutlineFacebook, AiOutlineInstagram } from 'react-icons/ai';
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom
import '../CSS/styles.css'; // Importing external CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Links</h3>
        <ul className="footer-links">
          <li><AiOutlineHome /> <Link to="/">Home</Link></li>
          <li><AiOutlineAppstore /> <Link to="/products">Products</Link></li>
          <li><AiOutlineMail /> <Link to="/news">News</Link></li>
          <li><AiOutlinePhone /> <Link to="/contact">Contact</Link></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Address</h3>
        <ul className="footer-address">
          <li><AiOutlineMail /> example@email.com</li>
          <li><AiOutlinePhone /> +123456789</li>
        </ul>
      </div>
      
      <div className="footer-section">
        <h3>Social Media</h3>
        <ul className="footer-social">
          <li><AiOutlineTwitter /></li>
          <li><AiOutlineFacebook /></li>
          <li><AiOutlineInstagram /></li>
        </ul>
      </div>
      <hr className="footer-line" />
      <div className="copy-right">
        <p>&copy; 2024 Your Company Name</p>
      </div>
    </footer>
  );
}

export default Footer;
