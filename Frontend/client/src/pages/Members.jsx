import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useSearchParams } from 'react-router-dom';
import { Input, Select, DatePicker, ConfigProvider } from 'antd';
import '../style/home.css';

const Members = () => {
    const [searchParams] = useSearchParams();
    const [allMembers, setAllMembers] = useState([]); // Store all fetched members
    const [members, setMembers] = useState([]); // Store filtered members
    const [filters, setFilters] = useState({
        search: searchParams.get('search') || '',
        batch: searchParams.get('batch') || '',
        course: searchParams.get('course') || '',
        company: searchParams.get('company') || ''
    });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    // Initial Fetch
    useEffect(() => {
        fetchMembers();
    }, []);

    // Filter Logic
    useEffect(() => {
        applyFilters();
    }, [filters, allMembers]);

    const fetchMembers = async () => {
        setLoading(true);
        try {
            // Backend currently returns ALL alumni. We filter on client side.
            const res = await axios.get('/users/alumni');
            setAllMembers(res.data || []);
        } catch (error) {
            console.error('Error fetching members', error);
            setAllMembers([]);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...allMembers];

        if (filters.search) {
            filtered = filtered.filter(m => m.name.toLowerCase().includes(filters.search.toLowerCase()));
        }
        if (filters.batch) {
            filtered = filtered.filter(m => m.batch && m.batch.includes(filters.batch));
        }
        if (filters.course) {
            filtered = filtered.filter(m => m.course === filters.course);
        }
        if (filters.company) {
            filtered = filtered.filter(m => (m.currentCompany && m.currentCompany.toLowerCase().includes(filters.company.toLowerCase())) ||
                (m.placedCompany && m.placedCompany.toLowerCase().includes(filters.company.toLowerCase())));
        }

        setMembers(filtered);
        setTotalPages(1); // Pagination not implemented yet
    };

    const handleAntChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setPage(1);
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#f37021',
                    borderRadius: 6,
                    padding: 12,
                    colorBorder: '#595959',
                    controlHeightLG: 48,
                },
                components: {
                    Input: { activeBorderColor: '#f37021', hoverBorderColor: '#f37021', },
                    Select: { colorPrimaryHover: '#f37021', },
                    DatePicker: { colorPrimaryHover: '#f37021', }
                }
            }}
        >
            <div className="container mt-5 mb-5" style={{ minHeight: '80vh' }}>
                {/* Search Section */}
                <div className="card newwww shadow-sm border-0 mb-5">
                    <div className="card-header newwww">Alumni Directory</div>
                    <div className="card-body p-4 bg-white">
                        <div className="row g-3">
                            <div className="col-lg-3 col-md-6">
                                <Input placeholder="Search by Name" size="large" allowClear value={filters.search} onChange={(e) => handleAntChange('search', e.target.value)} />
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <DatePicker picker="year" placeholder="Batch Year" style={{ width: '100%' }} size="large" onChange={(date, dateString) => handleAntChange('batch', dateString)} />
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <Select placeholder="Course" style={{ width: '100%' }} size="large" allowClear value={filters.course || undefined} onChange={(value) => handleAntChange('course', value)}>
                                    {['PG-DAC', 'PG-DBDA', 'PG-DESD', 'PG-DITISS', 'PG-DVLSI', 'PG-DMC', 'PG-DASSD', 'PG-DIOT', 'PG-DHPCSA', 'PG-DAIML', 'PG-DFBD', 'PG-DSSD', 'PG-DCLP', 'PG-DGIA', 'PG-DVLDD', 'PG-DCSF'].map(c => <Select.Option key={c} value={c}>{c}</Select.Option>)}
                                </Select>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <Input placeholder="Company" size="large" allowClear value={filters.company} onChange={(e) => handleAntChange('company', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Members Grid */}
                {loading ? <div className="text-center"><div className="spinner-border text-primary"></div></div> : (
                    <div className="row g-4">
                        {members.length > 0 ? members.map(member => (
                            <div className="col-lg-3 col-md-4 col-sm-6" key={member.id}>
                                <div className="card h-100 text-center p-3 shadow-sm border-0 member-card hover-lift">
                                    <img
                                        src={member.profilePicUrl ? `http://localhost:8081/user-images/${member.profilePicUrl}` : '/images/docs/Student1.png'}
                                        alt={member.name}
                                        className="rounded-circle mx-auto mb-3 shadow-sm"
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
                                    />
                                    <h5 className="fw-bold mb-1">{member.name}</h5>
                                    <p className="text-muted small mb-2">{member.course} - {member.batch || 'N/A'}</p>
                                    <span className="badge bg-light text-dark border mb-3">{member.currentCompany || 'Alumni'}</span>
                                    <div className="d-block">
                                        <a href={`mailto:${member.email}`} className="btn btn-cdac-orange btn-sm rounded-pill px-4">Connect</a>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="col-12 text-center py-5">
                                <p className="text-muted">No alumni found matching these filters.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </ConfigProvider>
    );
};

export default Members;
