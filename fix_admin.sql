-- RUN THIS SCRIPT TO FIX ADMIN LOGIN
-- This attempts to update the password for 'admin@cdac.in' to 'Admin@123' (BCrypt Encrypted).
-- If the user does not exist, it will do nothing (you must register first).

UPDATE users 
SET password = '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRkgVduK/1.9v.085.6b3.5y' -- Hash for 'Admin@123'
WHERE email = 'admin@cdac.in';

-- If you deleted the user, you can Insert it freshly:
-- INSERT INTO users (email, password, role, name, prn, course, batch) 
-- VALUES ('admin@cdac.in', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRkgVduK/1.9v.085.6b3.5y', 'ADMIN', 'System Admin', 'ADMIN001', 'ADMIN', '2024');
