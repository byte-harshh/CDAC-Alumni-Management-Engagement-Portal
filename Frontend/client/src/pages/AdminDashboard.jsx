import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Card, Table, Avatar, Spin, Alert, Tag, Button } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 1. Security Check
        const checkAdmin = () => {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (!storedUser || storedUser.email !== 'admin@cdac.in') {
                // Not Admin -> Redirect to Home
                navigate('/');
                return false;
            }
            return true;
        };

        if (!checkAdmin()) return;

        // 2. Fetch All Users
        const fetchUsers = async () => {
            try {
                // Hits the new GET /users endpoint in UserController
                const res = await axios.get('/users');
                setUsers(res.data);
            } catch (err) {
                console.error("Admin fetch error", err);
                setError("Failed to load users. Ensure you have Admin privileges.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 60,
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Avatar',
            key: 'avatar',
            width: 80,
            render: (text, record) => (
                <Avatar
                    src={record.profilePicUrl ? `http://localhost:8081/user-images/${record.profilePicUrl}` : null}
                    icon={<UserOutlined />}
                />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <strong>{text}</strong>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (text) => <Tag color={text === 'ADMIN' ? 'red' : 'green'}>{text}</Tag>,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'PRN',
            dataIndex: 'prn',
            key: 'prn',
        },
        {
            title: 'Batch',
            dataIndex: 'batch',
            key: 'batch',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: 'Course',
            dataIndex: 'course',
            key: 'course',
            render: (text) => <Tag color="geekblue">{text}</Tag>,
        },
        {
            title: 'Placed Company',
            dataIndex: 'placedCompany',
            key: 'placedCompany',
            render: (text) => text || <span style={{ color: '#ccc' }}>-</span>,
        },
        {
            title: 'Current Company',
            dataIndex: 'currentCompany',
            key: 'currentCompany',
            render: (text) => text || <span style={{ color: '#ccc' }}>-</span>,
        },
        {
            title: 'Password (Hashed)',
            dataIndex: 'password',
            key: 'password',
            width: 150,
            render: (text) => <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#888' }} title={text}>{text ? text.substring(0, 10) + '...' : ''}</span>,
        },
    ];

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
            <Spin size="large" tip="Loading Admin Dashboard..." />
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', background: '#f5f7fb', padding: '40px' }}>
            <Card
                title="Admin Dashboard - Alumni Management"
                extra={
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Button type="default" onClick={() => navigate('/admin')}>Manage Content & Jobs</Button>
                        <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>Sign Out</Button>
                    </div>
                }
                style={{ maxWidth: 1200, margin: '0 auto', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', borderRadius: 12 }}
            >
                {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 20 }} />}

                <Table
                    dataSource={users}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 1300 }}
                />
            </Card>
        </div>
    );
};

export default AdminDashboard;
