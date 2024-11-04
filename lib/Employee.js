class Employee {
    constructor(id, firstName, lastName, roleId, managerId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleId = roleId;
        this.managerId = managerId;
    }

    static validate(firstName, lastName, roleId) {
        if (!firstName || firstName.trim().length === 0) {
            throw new Error('First name cannot be empty');
        }
        if (!lastName || lastName.trim().length === 0) {
            throw new Error('Last name cannot be empty');
        }
        if (firstName.length > 30 || lastName.length > 30) {
            throw new Error('Names cannot exceed 30 characters');
        }
        if (!roleId) {
            throw new Error('Role ID is required');
        }
        return true;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

module.exports = Employee;
