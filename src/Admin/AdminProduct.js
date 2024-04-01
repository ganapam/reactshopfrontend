import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Footer from '../Footer/Footer';
import './adminProductStyles.css';

const AdminProduct = () => {
  const navigate = useNavigate();

  const [position, setPosition] = useState('');
  const [file, setFile] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchProducts();
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/products/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('position', position);
      formData.append('file', file);
      formData.append('display_name', displayName);

      const response = await axios.post('http://127.0.0.1:8000/product/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data.message);
      fetchProducts();
    } catch (error) {
      setMessage('Error uploading product');
      console.error('Error uploading product:', error);
    }
  };

  const handleDelete = async (position) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://127.0.0.1:8000/productdeletec/${position}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setProducts(products.filter(product => product.position !== position));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <AdminNavbar/>
      <div>
        <div className='card' >
          <h2>Upload Product</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Position:</label>
              <input type="number" value={position} onChange={(e) => setPosition(e.target.value)} required />
            </div>
            <div>
              <label>File (Image):</label>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
            </div>
            <div>
              <label>Display Name:</label>
              <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
            </div>
            <button type="submit">Submit</button>
          </form>
          {message && <p>{message}</p>}
        </div>
        <div className='card'>
          <h2>Products</h2>
          <ul>
            {products.map(product => (
              <li key={product.position}>
                Position ID: {product.position}, File Name: {product.file_name}, Display Name: {product.display_name}
                <button onClick={() => handleDelete(product.position)} className="delete-button">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AdminProduct;
