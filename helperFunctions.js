
/*
module.exports.getEmployeeBySkills = function (skills, employees) {
    let validEmployees = [];
    for (const [key, value] of Object.entries(employees)) {
        if(value.skills.includes(skill)) {
            validEmployees.push(employees[key]);
        }
    }
};*/

// resets ids of the employee object after deleting 
module.exports.resetIds = function (employees) {
    let newObj = {};
    let count = 1;
    for (const value of Object.values(employees)) {
        newObj[count] = value;
        count += 1;
    }
    return newObj;
}