INSERT INTO department (name) VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');

INSERT INTO role (title, salary, department_id) VALUES
    ('Software Engineer', 85000, 1),
    ('Lead Engineer', 125000, 1),
    ('Accountant', 75000, 2),
    ('Legal Team Lead', 250000, 3),
    ('Lawyer', 190000, 3),
    ('Sales Lead', 100000, 4),
    ('Salesperson', 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 2, NULL),
    ('Mike', 'Chan', 1, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, NULL),
    ('Sarah', 'Lourd', 5, 4),
    ('Tom', 'Allen', 6, NULL),
    ('Sam', 'Kash', 7, 6);
