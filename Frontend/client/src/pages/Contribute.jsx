import React, { useState } from "react";
import axios from '../api/axios';
import '../style/contribute.css';

const Contribute = () => {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const user = JSON.parse(localStorage.getItem('user'));

  const contributeData = [
    { id: 1, title: "Donations", desc: "Support infrastructure & scholarships.", icon: "💙", type: "DONATION" },
    { id: 2, title: "Awards & Medals", desc: "Sponsor academic excellence.", icon: "🏅", type: "AWARDS" },
    { id: 3, title: "Internships & MoUs", desc: "Offer internships or partnership.", icon: "🤝", type: "INTERNSHIP" },
    { id: 4, title: "Start-ups", desc: "Support alumni innovation.", icon: "🚀", type: "STARTUP" },
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
      alert('Contribution Request Submitted! Thank you.');
      setShowModal(false);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      alert('Submission Failed');
    }
  };

  return (
    <div className="container my-5">
      <div className="contribute-box">
        <h1 className="contribute-title">Contribute to C-DAC</h1>
        <p className="contribute-subtitle">
          Give back to your alma mater and help shape the future of innovation.
        </p>

        <div className="row g-4 mt-4">
          {contributeData.map((item) => (
            <div className="col-md-6 col-lg-3" key={item.id}>
              <div className="contribute-card" onClick={() => handleOpen(item.type)} style={{ cursor: 'pointer' }}>
                <div className="contribute-icon">{item.icon}</div>
                <h5 className="contribute-card-title">{item.title}</h5>
                <p className="contribute-card-text">{item.desc}</p>
                <button className="btn btn-sm btn-outline-light mt-3">Get Involved</button>
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
                  <h5 className="modal-title">Contribute: {category}</h5>
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
                      <label>Details / Message</label>
                      <textarea className="form-control" rows="3" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} required placeholder="How would you like to contribute?"></textarea>
                    </div>
                    <button className="btn btn-cdac-orange w-100">Submit Contribution</button>
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

export default Contribute;
