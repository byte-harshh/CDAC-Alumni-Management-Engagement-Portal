import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import '../style/event.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('/events');
      setEvents(res.data);
    } catch (error) {
      console.error('Error fetching events', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = async (eventId) => {
    if (!user) return alert('Please login to RSVP');
    try {
      await axios.post(`/events/${eventId}/rsvp`);
      alert('RSVP Successful! We look forward to seeing you.');
    } catch (error) {
      alert(error.response?.data?.message || 'RSVP Failed');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="events-title">C-DAC Event Alerts</h2>
      <p className="events-subtitle">
        Stay informed about upcoming programs, workshops, and conferences at C-DAC
      </p>

      {loading ? (
        <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>
      ) : (
        <div className="row g-4 mt-4">
          {events.length > 0 ? (
            events.map((event) => (
              <div className="col-md-6 col-lg-4" key={event.id}>
                <div className="event-card">
                  <div className="event-badge">{event.status || 'Upcoming'}</div>
                  <div className="event-body">
                    <h5 className="event-title">{event.title}</h5>
                    <p className="event-desc">{event.description}</p>
                    <div className="event-info">
                      <span><strong>Date:</strong> {event.date ? new Date(event.date).toLocaleString() : 'TBA'}</span>
                      <span><strong>Location:</strong> {event.location}</span>
                      <span><strong>Type:</strong> {event.type}</span>
                    </div>
                  </div>
                  <button className="btn btn-cdac-orange" onClick={() => handleRSVP(event.id)}>
                    RSVP Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No upcoming events at the moment.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Events;

