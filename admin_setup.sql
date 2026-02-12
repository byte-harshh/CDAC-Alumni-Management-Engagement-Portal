-- OPTION 1: Recommended Implementation (Register & Promote)
-- 1. Go to the Registration Page in your browser (e.g., http://localhost:8080/register).
-- 2. Register a new user with Name: "Admin", Email: "admin@cdac.in", Password: "Admin@123", and any dummy data for PRN/Course.
-- 3. Run the following SQL command to promote this user to Admin:

UPDATE users SET role = 'ADMIN' WHERE email = 'admin@cdac.in';

-- OPTION 2: Direct Insert (Only if you have a valid BCrypt hash)
-- Note: You CANNOT insert 'Admin@123' directly as the password must be BCrypt encrypted.
-- If you have a BCrypt hash for 'Admin@123' (e.g., generated online), replace 'YOUR_BCRYPT_HASH_HERE' below.

-- INSERT INTO users (name, email, password, role, prn, course, batch, placed_company, current_company)
-- VALUES ('System Admin', 'admin@cdac.in', 'YOUR_BCRYPT_HASH_HERE', 'ADMIN', '0000000000', 'ADMINISTRATION', '2023', 'CDAC', 'CDAC');
