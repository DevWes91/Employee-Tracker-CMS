const pool = require('../config/connection');

class Database {
    constructor() {
        this.pool = pool;
    }

    async viewAllDepartments() {
        const query = 'SELECT * FROM department ORDER BY id';
        const { rows } = await this.pool.query(query);
        return rows;
    }

    async viewAllRoles() {
        const query = `
            SELECT r.id, r.title, r.salary, d.name as department
            FROM role r
            JOIN department d ON r.department_id = d.id
            ORDER BY r.id
        `;
        const { rows } = await this.pool.query(query);
        return rows;
    }

    async viewAllEmployees() {
        const query = `
            SELECT 
                e.id,
                e.first_name,
                e.last_name,
                r.title,
                d.name as department,
                r.salary,
                CONCAT(m.first_name, ' ', m.last_name) as manager
            FROM employee e
            LEFT JOIN role r ON e.role_id = r.id
            LEFT JOIN department d ON r.department_id = d.id
            LEFT JOIN employee m ON e.manager_id = m.id
            ORDER BY e.id
        `;
        const { rows } = await this.pool.query(query);
        return rows;
    }

    async addDepartment(name) {
        const query = 'INSERT INTO department (name) VALUES ($1) RETURNING *';
        const { rows } = await this.pool.query(query, [name]);
        return rows[0];
    }

    async addRole(title, salary, departmentId) {
        const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *';
        const { rows } = await this.pool.query(query, [title, salary, departmentId]);
        return rows[0];
    }

    async addEmployee(firstName, lastName, roleId, managerId) {
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *';
        const { rows } = await this.pool.query(query, [firstName, lastName, roleId, managerId]);
        return rows[0];
    }

    async updateEmployeeRole(employeeId, roleId) {
        const query = 'UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *';
        const { rows } = await this.pool.query(query, [roleId, employeeId]);
        return rows[0];
    }

    // Bonus functions
    async viewEmployeesByManager(managerId) {
        const query = `
            SELECT 
                e.id,
                e.first_name,
                e.last_name,
                r.title
            FROM employee e
            JOIN role r ON e.role_id = r.id
            WHERE e.manager_id = $1
        `;
        const { rows } = await this.pool.query(query, [managerId]);
        return rows;
    }

    async getDepartmentBudget(departmentId) {
        const query = `
            SELECT 
                d.name,
                SUM(r.salary) as total_budget
            FROM employee e
            JOIN role r ON e.role_id = r.id
            JOIN department d ON r.department_id = d.id
            WHERE d.id = $1
            GROUP BY d.name
        `;
        const { rows } = await this.pool.query(query, [departmentId]);
        return rows[0];
    }
}

module.exports = Database;
