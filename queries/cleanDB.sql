-- Disable foreign key checks
SET foreign_key_checks = 0;

-- Truncate your tables
TRUNCATE TABLE tasks;
TRUNCATE TABLE users;
TRUNCATE TABLE categories;

-- Enable foreign key
SET foreign_key_checks = 1;
