import React, { useState, useEffect } from 'react';
import TopNavbar from '../Navbars/TopNavbar';
import MainNavbar from '../Navbars/MainNavbar';
import Footer from '../Footer/Footer';
import axios from 'axios';

const News = () => {
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    const fetchNewsArticles = async (startPosition, endPosition) => {
      try {
        const positionIds = Array.from({ length: endPosition - startPosition + 1 }, (_, index) => startPosition + index);
        
        const articlePromises = positionIds.map(positionId =>
          axios.get(`http://127.0.0.1:8000/news/${positionId}`)
            .then(response => response.data)
            .catch(error => null)
        );

        const responses = await Promise.all(articlePromises);
        const filteredArticles = responses.filter(article => article !== null);

        setNewsArticles(filteredArticles);
      } catch (error) {
        console.error('Error fetching news articles:', error);
      }
    };
    
    fetchNewsArticles(1, 50);
  }, []);

  return (
    <div>
      <TopNavbar />
      <MainNavbar />
      <div className="container mt-5">
        <h1 className="mb-4 text-center">Latest News</h1>
        <div className="row">
          {newsArticles.map(article => (
            <div key={article.id} className="col-md-12 mb-4">
              <div className="card" style={{ height: '100%' }}>
                <img 
                  src={`http://127.0.0.1:8000/news/image/${article.position_id}`} 
                  className="card-img-top" 
                  alt={article.title} 
                  style={{  height: '200px', width: '100%' }} 
                />
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.content}</p>
                  <small className="text-muted">{article.date}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default News;
