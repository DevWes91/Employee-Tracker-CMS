const inquirer = require('inquirer');
const Database = require('../lib/Database');
const db = new Database();

const prompt = {
    mainMenu: () => {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add Department',
                    'Add Role',
                    'Add Employee',
                    'Update Employee Role',
                    'Exit'
                ]
            }
        ]);
    },

    addDepartment: () => {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the department?',
                validate: input => input ? true : 'Department name cannot be empty.'
            }
        ]);
    },

    addRole: async () => {
        const departments = await db.viewAllDepartments();
        return inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role?',
                validate: input => input ? true : 'Role title cannot be empty.'
            },
            {
                type: 'number',
                name: 'salary',
                message: 'What is the salary for this role?',
                validate: input => !isNaN(input) ? true : 'Please enter a valid number.'
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'Which department does this role belong to?',
                choices: departments.map(dept => ({
                    name: dept.name,
                    value: dept.id
                }))
            }
        ]);
    },

    addEmployee: async () => {
        const roles = await db.viewAllRoles();
        const employees = await db.viewAllEmployees();
        
        return inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "What is the employee's first name?",
                validate: input => input ? true : 'First name cannot be empty.'
            },
            {
                type: 'input',
                name: 'lastName',
                message: "What is the employee's last name?",
                validate: input => input ? true : 'Last name cannot be empty.'
            },
            {
                type: 'list',
                name: 'roleId',
                message: "What is the employee's role?",
                choices: roles.map(role => ({
                    name: role.title,
                    value: role.id
                }))
            },
            {
                type: 'list',
                name: 'managerId',
                message: "Who is the employee's manager?",
                choices: [
                    { name: 'None', value: null },
                    ...employees.map(emp => ({
                        name: `${emp.first_name} ${emp.last_name}`,
                        value: emp.id
                    }))
                ]
            }
        ]);
    },

    updateEmployeeRole: async () => {
        const employees = await db.viewAllEmployees();
        const roles = await db.viewAllRoles();

        return inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Which employee would you like to update?',
                choices: employees.map(emp => ({
                    name: `${emp.first_name} ${emp.last_name}`,
                    value: emp.id
                }))
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'What is their new role?',
                choices: roles.map(role => ({
                    name: role.title,
                    value: role.id
                }))
            }
        ]);
    }
};

module.exports = { prompt };
