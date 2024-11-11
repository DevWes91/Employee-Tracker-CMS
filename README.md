# Employee Tracker CMS

## Description
A command-line Content Management System (CMS) for managing company employees, departments, and roles using Node.js, PostgreSQL, and Inquirer.

## Features
- View all departments, roles, and employees
- Add departments, roles, and employees
- Update employee roles
- View employees by manager
- View employees by department
- Calculate total department budgets
- Delete departments, roles, and employees

## Installation
git clone <repository-url>
2. Install dependencies
npm install
3. Set up your PostgreSQL database:
Create a .env file using the provided template
Run the schema and seeds:
psql -U postgres -f db/schema.sql
psql -U postgres -f db/seeds.sql

## Usage
1. Start the application:
npm start 
2. Use arrow keys to navigate through options
3. Follow prompts to manage your employee database

## Technologies Used
Node.js
PostgreSQL
Inquirer
Console.table
dotenv

## Database Schema
- Departments (id, name)
- Roles (id, title, salary, department_id)
- Employees (id, first_name, last_name, role_id, manager_id)

## Contributing 
1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes
4. Write tests for your changes
5. Submit a pull request

## License 
MIT License
