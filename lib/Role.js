class Role {
    constructor(id, title, salary, departmentId) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.departmentId = departmentId;
    }

    static validate(title, salary, departmentId) {
        if (!title || title.trim().length === 0) {
            throw new Error('Role title cannot be empty');
        }
        if (title.length > 30) {
            throw new Error('Role title cannot exceed 30 characters');
        }
        if (isNaN(salary) || salary < 0) {
            throw new Error('Salary must be a positive number');
        }
        if (!departmentId) {
            throw new Error('Department ID is required');
        }
        return true;
    }
}

module.exports = Role;
