-- Insert Test Data for Verification

-- 1. Insert Alumni Users (Password is 'password' hashed with BCrypt)
INSERT INTO users (name, email, password, role, batch, course, current_company, placed_company, phone, prn) VALUES 
('Amit Sharma', 'amit.sharma@example.com', '$2a$10$dow.S.0L2.B6.F.D3.r.H.y.j.u.k.l.', 'ALUMNI', '2023', 'PG-DAC', 'Google', 'Microsoft', '9876543210', '1020304050'),
('Priya Singh', 'priya.singh@example.com', '$2a$10$dow.S.0L2.B6.F.D3.r.H.y.j.u.k.l.', 'ALUMNI', '2022', 'PG-DBDA', 'Amazon', 'Amazon', '9123456780', '1020304051'),
('Rahul Verma', 'rahul.verma@example.com', '$2a$10$dow.S.0L2.B6.F.D3.r.H.y.j.u.k.l.', 'ALUMNI', '2024', 'PG-DESD', 'Intel', 'Intel', '9012345678', '1020304052');

-- 2. Insert Events
INSERT INTO events (title, description, date, location, type, status) VALUES 
('Alumni Night 2026', 'A grand reunion for all batches of C-DAC.', '2026-03-20T19:00:00', 'Pune Campus', 'Meetup', 'Upcoming'),
('AI & Future Tech', 'Workshop on the latest trends in AI and ML.', '2026-04-05T10:00:00', 'Online / Hybrid', 'Workshop', 'Upcoming');

-- 3. Insert Jobs
INSERT INTO jobs (title, description, company, location, posted_date) VALUES 
('Full Stack Developer', 'Looking for MERN stack developer with 2 years exp.', 'Tech Mahindra', 'Pune', '2025-02-10'),
('Data Scientist', 'Specialist in Python, R and Big Data.', 'TCS', 'Bangalore', '2025-02-12');
