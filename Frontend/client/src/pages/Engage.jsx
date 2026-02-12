import React, { useState } from "react";
import axios from '../api/axios';
import '../style/engage.css';

const Engage = () => {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const user = JSON.parse(localStorage.getItem('user'));

  const engageData = [
    { id: 1, title: "Be a Mentor", desc: "Guide and support current students.", icon: "🎓", type: "MENTORSHIP" },
    { id: 2, title: "Volunteer", desc: "Participate in events.", icon: "🤝", type: "VOLUNTEER" },
    { id: 3, title: "Guest Lecturer", desc: "Deliver expert talks.", icon: "🧠", type: "GUEST_LECTURE" },
    { id: 4, title: "Motivational Speaker", desc: "Inspire students.", icon: "🎤", type: "SPEAKER" },
  ];

  const handleOpen = (type) => {
    setCategory(type);
    if (user) {
      setFormData({ ...formData, name: user.name, email: user.email });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/engage', {
        userId: user ? user.id : null,
        userName: formData.name,
        userEmail: formData.email,
        category: category,
        message: formData.message
      });
      alert('Request Submitted! We will contact you soon.');
      setShowModal(false);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      alert('Submission Failed');
    }
  };

  return (
    <div className="container my-5">
      <div className="engage-box">
        <h1 className="engage-title">Engage with C-DAC</h1>
        <p className="engage-subtitle">Collaborate, contribute, and connect with the community.</p>

        <div className="row g-4 mt-4">
          {engageData.map((item) => (
            <div className="col-md-6 col-lg-3" key={item.id}>
              <div className="engage-card" onClick={() => handleOpen(item.type)} style={{ cursor: 'pointer' }}>
                <div className="engage-icon">{item.icon}</div>
                <h5 className="engage-card-title">{item.title}</h5>
                <p className="engage-card-text">{item.desc}</p>
                <button className="btn btn-sm btn-outline-light mt-3">Join Now</button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Join as {category}</h5>
                  <button className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label>Name</label>
                      <input className="form-control" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label>Email</label>
                      <input className="form-control" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label>Message / Details</label>
                      <textarea className="form-control" rows="3" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} required placeholder="Tell us how you'd like to help..."></textarea>
                    </div>
                    <button className="btn btn-cdac-orange w-100">Submit Request</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Engage;
