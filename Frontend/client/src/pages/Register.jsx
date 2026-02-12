import React, { useState } from 'react';
import api from '../api/axios'; // Ensure this points to your corrected axios.js
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, Upload, Row, Col, Alert, Select, DatePicker } from 'antd';
import { UploadOutlined, UserAddOutlined } from '@ant-design/icons';

const Register = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Triggered when the "Register" button is clicked
  const onFinish = async (values) => {
    setLoading(true);
    setError('');

    // 1. Create FormData object (Required for sending files)
    const data = new FormData();

    // 2. Append standard text fields
    data.append('name', values.name);
    data.append('email', values.email);
    data.append('prn', values.prn);
    data.append('phone', values.phone || '');
    data.append('password', values.password);
    data.append('course', values.course);

    // 3. Handle Date Formatting (Batch Year)
    // Ant Design DatePicker returns a Dayjs object, backend needs a String
    if (values.batch_year) {
      data.append('batch_year', values.batch_year.format('MMM-YYYY')); // e.g., "Feb-2023"
    }

    // 4. Handle Optional Fields
    data.append('placed_company', values.placed_company || 'NA');
    data.append('current_company', values.current_company || 'NA');

    // 5. Append the File (Profile Picture)
    if (file) {
      data.append('profile_pic', file);
    }

    try {
      // 6. Send Request
      // We don't need to manually set 'Content-Type', axios does it for FormData
      const response = await api.post('/auth/register', data);

      console.log("Registration Success:", response.data);
      alert("Registration Successful! Please Login.");
      navigate('/login');

    } catch (err) {
      console.error("Registration Error:", err);
      const errorMsg = err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7fb', padding: '40px 20px' }}>
      <Card
        title={<><UserAddOutlined /> Alumni Registration</>}
        className="register-card-head"
        style={{ width: '100%', maxWidth: 900, borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
      >
        {error && <Alert type="error" message="Error" description={error} showIcon style={{ marginBottom: 16 }} />}

        <Form
          layout="vertical"
          onFinish={onFinish} // Use onFinish instead of handleSubmit
          scrollToFirstError
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
                <Input placeholder="Full Name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                <Input placeholder="email@example.com" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Contact Number" name="phone" rules={[{ required: true, message: 'Please enter phone number' }]}>
                <Input placeholder="Phone Number" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="PRN Number" name="prn" rules={[{ required: true, message: 'Please enter your PRN Number' }]}>
                <Input placeholder="Enter PRN Number" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Profile Picture">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Upload
                    beforeUpload={(file) => { setFile(file); return false; }} // Prevent auto-upload, store file in state
                    maxCount={1}
                    onRemove={() => setFile(null)}
                  >
                    <Button icon={<UploadOutlined />}>Select File</Button>
                  </Upload>
                  {file && <span style={{ marginLeft: 10, color: 'green' }}>Selected: {file.name}</span>}
                </div>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="C-DAC Course" name="course" rules={[{ required: true, message: 'Please select your course' }]}>
                <Select placeholder="Select Course">
                  <Select.Option value="PG-DAC">PG-DAC</Select.Option>
                  <Select.Option value="PG-DBDA">PG-DBDA</Select.Option>
                  <Select.Option value="PG-DESD">PG-DESD</Select.Option>
                  <Select.Option value="PG-DITISS">PG-DITISS</Select.Option>
                  <Select.Option value="PG-DVLSI">PG-DVLSI</Select.Option>
                  <Select.Option value="PG-DASSD">PG-DASSD</Select.Option>
                  <Select.Option value="PG-DMC">PG-DMC</Select.Option>
                  <Select.Option value="PG-DIOT">PG-DIOT</Select.Option>
                  <Select.Option value="PG-DHPCSA">PG-DHPCSA</Select.Option>
                  <Select.Option value="PG-DAIML">PG-DAIML</Select.Option>
                  <Select.Option value="PG-DFBD">PG-DFBD</Select.Option>
                  <Select.Option value="PG-DSSD">PG-DSSD</Select.Option>
                  <Select.Option value="PG-DCLP">PG-DCLP</Select.Option>
                  <Select.Option value="PG-DGIA">PG-DGIA</Select.Option>
                  <Select.Option value="PG-DVLDD">PG-DVLDD</Select.Option>
                  <Select.Option value="PG-DCSF">PG-DCSF</Select.Option>
                  {/* Add other courses as needed */}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Batch Year" name="batch_year" rules={[{ required: true, message: 'Please select your batch' }]}>
                <DatePicker picker="month" format="MMM-YYYY" placeholder="Select Batch (Month-Year)" style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Placed Company (C-DAC)" name="placed_company">
                <Input placeholder="Company Name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Current Company" name="current_company">
                <Input placeholder="Company Name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Password" name="password" rules={[{ required: true, min: 6, message: 'Password must be at least 6 characters' }]}>
                <Input.Password placeholder="Password" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Please confirm your password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Re-enter password" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large" className="register-btn" loading={loading}>
                  Register
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default Register;