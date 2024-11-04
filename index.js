const inquirer = require('inquirer');
const { prompt } = require('./utils/inquirer');
const Database = require('./lib/Database');
require('console.table');

const db = new Database();

async function init() {
    let exit = false;
    while (!exit) {
        const { choice } = await prompt.mainMenu();
        
        switch (choice) {
            case 'View All Departments':
                const departments = await db.viewAllDepartments();
                console.table(departments);
                break;
            case 'View All Roles':
                const roles = await db.viewAllRoles();
                console.table(roles);
                break;
            case 'View All Employees':
                const employees = await db.viewAllEmployees();
                console.table(employees);
                break;
            case 'Add Department':
                const deptAnswer = await prompt.addDepartment();
                await db.addDepartment(deptAnswer.name);
                console.log('Department added successfully!');
                break;
            case 'Add Role':
                const roleAnswer = await prompt.addRole();
                await db.addRole(roleAnswer.title, roleAnswer.salary, roleAnswer.departmentId);
                console.log('Role added successfully!');
                break;
            case 'Add Employee':
                const empAnswer = await prompt.addEmployee();
                await db.addEmployee(
                    empAnswer.firstName,
                    empAnswer.lastName,
                    empAnswer.roleId,
                    empAnswer.managerId
                );
                console.log('Employee added successfully!');
                break;
            case 'Update Employee Role':
                const updateAnswer = await prompt.updateEmployeeRole();
                await db.updateEmployeeRole(updateAnswer.employeeId, updateAnswer.roleId);
                console.log('Employee role updated successfully!');
                break;
            case 'Exit':
                exit = true;
                process.exit(0);
        }
    }
}

init().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
