import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Card, Descriptions, Spin, Alert, Avatar, Button, Row, Col } from 'antd';
import { UserOutlined, LogoutOutlined, MailOutlined, NumberOutlined, BookOutlined, CalendarOutlined, PhoneOutlined, BankOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            // 1. Get User Email from LocalStorage (saved during Login)
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (!storedUser || !storedUser.email) {
                navigate('/login');
                return;
            }

            try {
                // 2. Fetch fresh data from Backend using Email
                const res = await axios.get(`/users/profile/${storedUser.email}`);
                setUser(res.data);
            } catch (err) {
                console.error("Profile fetch error", err);
                setError("Failed to load profile data.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('email', user.email);
        formData.append('file', file);

        try {
            setLoading(true);
            const res = await axios.post('/users/profile/image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Update state
            setUser(res.data);

            // Update localStorage
            const currentUser = JSON.parse(localStorage.getItem('user'));
            if (currentUser) {
                currentUser.profilePicUrl = res.data.profilePicUrl;
                localStorage.setItem('user', JSON.stringify(currentUser));
            }

            alert("Profile Picture Updated!");
        } catch (err) {
            console.error("Image upload failed", err);
            alert("Failed to update profile picture.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        window.location.reload();
    };

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f7fb' }}>
            <Spin size="large" />
        </div>
    );

    if (error) return (
        <div style={{ padding: 20, display: 'flex', justifyContent: 'center' }}>
            <Alert type="error" message={error} showIcon />
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f0f2f5', padding: '20px' }}>
            <Card
                style={{ width: '100%', maxWidth: 800, borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.1)', overflow: 'hidden' }}
                bodyStyle={{ padding: 0 }}
            >
                {/* Header Section */}
                <div style={{ background: 'linear-gradient(135deg, #003366 0%, #0056b3 100%)', padding: '40px 20px', textAlign: 'center', position: 'relative' }}>
                    <Button
                        type="primary"
                        danger
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                        style={{ position: 'absolute', top: 20, right: 20, borderRadius: 6 }}
                    >
                        Sign Out
                    </Button>

                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <Avatar
                            size={120}
                            src={user.profilePicUrl ? `http://localhost:8081/user-images/${user.profilePicUrl}` : null}
                            icon={<UserOutlined />}
                            style={{ border: '4px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', backgroundColor: '#f0f2f5', color: '#003366' }}
                        />
                        <label htmlFor="profile-upload" style={{
                            position: 'absolute', bottom: 10, right: 10,
                            background: 'white', borderRadius: '50%', padding: '8px',
                            cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: '32px', height: '32px'
                        }}>
                            <span style={{ fontSize: '14px', color: '#003366', fontWeight: 'bold' }}>✎</span>
                        </label>
                        <input id="profile-upload" type="file" hidden onChange={handleImageUpload} accept="image/*" />
                    </div>
                    <h2 style={{ color: 'white', marginTop: 16, fontWeight: 'bold', marginBottom: 4 }}>{user.name}</h2>
                    <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 20 }}>
                        {user.role || 'Alumni'}
                    </span>
                </div>

                {/* Details Section */}
                <div style={{ padding: '30px 40px' }}>
                    <Descriptions title="Personal Information" bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
                        <Descriptions.Item label={<><MailOutlined /> Email</>}>{user.email}</Descriptions.Item>
                        <Descriptions.Item label={<><NumberOutlined /> PRN</>}>{user.prn}</Descriptions.Item>
                        <Descriptions.Item label={<><BookOutlined /> Course</>}>{user.course}</Descriptions.Item>
                        <Descriptions.Item label={<><CalendarOutlined /> Batch</>}>{user.batch}</Descriptions.Item>
                        <Descriptions.Item label={<><PhoneOutlined /> Phone</>}>{user.phone}</Descriptions.Item>
                        <Descriptions.Item label={<><BankOutlined /> Current Company</>}>{user.currentCompany || 'Not Specified'}</Descriptions.Item>
                        <Descriptions.Item label={<><BankOutlined /> Placed Company</>}>{user.placedCompany || 'Not Specified'}</Descriptions.Item>
                    </Descriptions>
                </div>
            </Card>
        </div>
    );
};

export default Profile;
