import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import Footer from '../Footer/Footer';
import './AdminPWires.css'; 
import { useNavigate } from 'react-router-dom';

const AdminWaterpipes = () => {
        const [waterpipes, setWaterpipes] = useState([]);
        const [position, setPosition] = useState('');
        const [displayName, setDisplayName] = useState('');
        const [price, setPrice] = useState('');
        const [image, setImage] = useState(null);
        const navigate = useNavigate();
        const fetchwaterpipes = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/waterpipesAll');
            setWaterpipes(response.data);
          } catch (error) {
            console.error('Error fetching waterpipes:', error);
          }
        };
      
        useEffect(() => {
          const token = localStorage.getItem('token');
          if (!token) {
            // If token is not found, redirect to login page
            navigate('/login');
          } else {
            fetchwaterpipes();
          }
        }, [navigate]);
      
        const handleDelete = async (position) => {
          try {
            await axios.delete(`http://127.0.0.1:8000/waterpipes/${position}`);
            setWaterpipes(waterpipes.filter(wire => wire.position !== position));
          } catch (error) {
            console.error('Error deleting waterpipes:', error);
          }
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
      
          const formData = new FormData();
          formData.append('position', position);
          formData.append('display_name', displayName);
          formData.append('price', price);
          formData.append('file', image);
      
          try {
            const response = await axios.post('http://127.0.0.1:8000/waterpipes/', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            console.log(response.data.message); // Log success message
            // Reset form fields after successful submission
            setPosition('');
            setDisplayName('');
            setPrice('');
            setImage(null);
            // Fetch wires again to update the list
            fetchwaterpipes();
          } catch (error) {
            console.error('Error uploading waterpipes:', error);
            // Handle error, show error message to user
          }
        };
  return (
<div>
    <AdminNavbar/>
    <div>
    <div className="card">
      <h2 className="cardTitle">Create a New waterpipes Product</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formGroup">
          <label>Position ID:</label>
          <input type="number" value={position} onChange={(e) => setPosition(e.target.value)} className="input" required />
        </div>
        <div className="formGroup">
          <label>Display Name:</label>
          <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="input" required />
        </div>
        <div className="formGroup">
          <label>Price:</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="input" required />
        </div>
        <div className="formGroup">
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="input" required />
        </div>
        <button type="submit" className="button">Upload waterpipes</button>
      </form></div>
<div className='card'>
      <h2 className="cardTitle">waterpipes Details</h2>
      <ul className="list">
        {waterpipes.map((waterpipes) => (
          <li key={waterpipes.position} className="listItem">
            <div>Position: {waterpipes.position}</div>
            <div>Display Name: {waterpipes.display_name}</div>
            <div>Price: {waterpipes.price}</div>
            <button onClick={() => handleDelete(waterpipes.position)} className="deleteButton">Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
    <Footer/>
  </div>
);
};

export default AdminWaterpipes
