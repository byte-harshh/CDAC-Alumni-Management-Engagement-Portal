import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import '../style/news.css';

const News = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      // Fetching from Content Service
      const res = await axios.get('/content?type=NEWS');
      setNewsList(res.data);
    } catch (error) {
      console.error('Error fetching news', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="news-title">News & Updates</h2>
      <div className="row g-4">
        {newsList.map(news => (
          <div className="col-md-6 col-lg-4" key={news.id}>
            <div className="card h-100 news-card">
              <div className="news-img-wrapper">
                {news.image_url && (
                  <img src={news.image_url} className="card-img-top" alt={news.title} />
                )}
                <span className="news-date">
                  {news.date || new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="news-card-title">{news.title}</h5>
                <p className="news-summary">{news.summary}</p>
                <button className="btn btn-cdac-orange mt-auto" data-bs-toggle="modal" data-bs-target={`#newsModal${news.id}`}>Read More</button>
              </div>
            </div>

            {/* Modal */}
            <div className="modal fade" id={`newsModal${news.id}`} tabIndex="-1">
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header news-modal-header">
                    <h5 className="modal-title">{news.title}</h5>
                    <button className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                  </div>
                  <div className="modal-body">
                    {news.image_url && <img src={news.image_url} className="img-fluid mb-3 rounded" alt="" />}
                    <p style={{ whiteSpace: 'pre-line' }}>{news.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;

