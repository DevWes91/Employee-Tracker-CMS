class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static validate(name) {
        if (!name || name.trim().length === 0) {
            throw new Error('Department name cannot be empty');
        }
        if (name.length > 30) {
            throw new Error('Department name cannot exceed 30 characters');
        }
        return true;
    }
}

module.exports = Department;
