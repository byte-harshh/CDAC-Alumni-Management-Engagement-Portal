import React, { useState } from 'react';
import api from '../api/axios'; // Use your custom axios instance
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, Alert, Row, Col } from 'antd';
import { LoginOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    setError('');

    try {
      // 1. Send Login Request
      const res = await api.post('/auth/login', values);

      // 2. Extract Data from Backend Response
      // Backend returns: { token: "...", user: { ... } }
      const { token, user } = res.data;

      // 3. Save to Local Storage (CRITICAL STEP)
      localStorage.setItem('token', token); // Save Token for API calls
      localStorage.setItem('user', JSON.stringify(user)); // Save User info for display

      // 4. Redirect to Dashboard/Home
      alert("Login Successful!");
      navigate('/');
      window.location.reload(); // Reload to update Navbar state

    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || 'Login failed. Invalid Credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7fb', padding: '20px' }}>
      <Card
        className="register-card-head"
        style={{ width: '100%', maxWidth: 900, borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', overflow: 'hidden' }}
        bodyStyle={{ padding: 0 }}
      >
        <Row>
          {/* Left Side: Login Form */}
          <Col xs={24} md={12} style={{ padding: '40px', borderRight: '1px solid #f0f0f0' }}>
            <h3 style={{ textAlign: 'center', color: '#003366', fontWeight: 'bold', marginBottom: '24px', fontSize: '1.5rem' }}>
              <LoginOutlined style={{ marginRight: 8 }} /> Alumni Login
            </h3>

            {error && <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }} />}

            <Form
              name="login_form"
              layout="vertical"
              onFinish={onFinish}
              size="large"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Invalid email!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="email@example.com" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block className="register-btn" loading={loading} style={{ backgroundColor: '#003366', borderColor: '#003366' }}>
                  LOGIN
                </Button>
              </Form.Item>

              <div style={{ textAlign: 'center' }}>
                New User? <a href="/register" style={{ color: '#f47920' }}>Register Here</a>
              </div>
            </Form>
          </Col>

          {/* Right Side: Info Panel */}
          <Col xs={24} md={12} style={{ background: '#003366', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#ffffff', fontWeight: 'bold', marginBottom: '20px' }}>Welcome Back!</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '30px' }}>
                Login to access exclusive alumni events, job opportunities, and connect with your batchmates.
              </p>
              {/* Add your logo image here if you have one, or keep the text */}
              <div style={{ fontSize: '4rem', color: 'white' }}>🎓</div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Login;