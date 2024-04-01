import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import Footer from '../Footer/Footer';
import './AdminNews.css';
const AdminNews = () => {
  const [positionId, setPositionId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [newsList, setNewsList] = useState([]);

  // Function to fetch all news articles
  const fetchAllNews = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/newsall/');
      setNewsList(response.data);
    } catch (error) {
      console.error('Error fetching all news articles:', error);
    }
  };

  // Function to delete a news article
  const deleteNewsArticle = async (positionId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/news/${positionId}`);
      setNewsList(newsList.filter(news => news.position_id !== positionId));
      setSuccessMessage('News article deleted successfully.');
    } catch (error) {
      console.error('Error deleting news article:', error);
      setErrorMessage('Failed to delete news article. Please try again.');
    }
  };

  // Fetch all news articles when component mounts
  useEffect(() => {
    fetchAllNews();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('position_id', positionId);
      formData.append('title', title);
      formData.append('content', content);
      formData.append('uploadfile', file);
  
      await axios.post('http://127.0.0.1:8000/news/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      setSuccessMessage('News article uploaded successfully.');
      setPositionId('');
      setTitle('');
      setContent('');
      setFile(null);
      // Refetch all news articles after uploading new article
      fetchAllNews();
    } catch (error) {
      console.error('Error uploading news article:', error);
      setErrorMessage('Failed to upload news article. Please try again.');
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div>
      <div className=" card container mt-5">
        <h1 className=" mb-4">Upload News Article</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="positionId" className="form-label">Position ID</label>
            <input type="text" className="form-control" id="positionId" value={positionId} onChange={(e) => setPositionId(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Content</label>
            <textarea className="form-control" id="content" rows="3" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="file" className="form-label">File Upload</label>
            <input type="file" className="form-control" id="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <button type="submit" className="btn btn-primary">Upload</button>
          {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
        </form></div>
<div className='card'>
        <h2 className="mb-4">All News Articles</h2>
        <ul>
  {newsList.map(news => (
    <li key={news.position_id}>
      <strong>Position ID:</strong> {news.position_id} <br />
      <strong>Title:</strong> {news.title} <br />
      <strong>Content:</strong> {news.content} <br />
      <button className="btn btn-danger" onClick={() => deleteNewsArticle(news.position_id)}>Delete</button>
    </li>
  ))}
</ul>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminNews;
