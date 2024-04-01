import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import Footer from '../Footer/Footer';
import './Admin.css'; // Import external CSS file for styling
import { useNavigate } from 'react-router-dom';
const AdminUploadComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [position, setPosition] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If token is not found, redirect to login page
      navigate('/login');
    } else {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/imagesc/');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();}
  }, []);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('position', position);

    try {
      const response = await axios.post(`http://localhost:8000/uploadc/?position=${position}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        setSuccessMessage(response.data.message);
        setSelectedImage(null);
        setPosition('');
      }
    } catch (error) {
      setErrorMessage('Error uploading image. Please try again.');
    }
  };

  const handleDelete = async (position) => {
    try {
      const response = await axios.delete(`http://localhost:8000/deletec/${position}`);
      if (response.status === 200) {
        setImages(images.filter(image => image.position !== position));
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="card">
        <h2>Upload Image for Carousel</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Select Image:</label>
            <input type="file" onChange={handleImageChange} />
          </div>
          <div>
            <label>Position in Carousel:</label>
            <input type="number" value={position} onChange={handlePositionChange} />
          </div>
          <button type="submit">Upload Image</button>
        </form>
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </div>

      <div className="card">
        <h2>Images Present in Database</h2>
        <ul className="image-list">
          {images.map((image, index) => (
            <li key={index}>
              <div className="image-info">
                <p>Position: {image.position}</p>
                <p>File Name: {image.filename}</p>
              </div>
              <button onClick={() => handleDelete(image.position)} className="delete-button">Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default AdminUploadComponent;
