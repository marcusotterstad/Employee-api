let employees = {
    1 : {name: "Marcus Otterstad", skills: ["api", "react", "python", "javascript", "html"]},
    2 : {name: "Christine Otterstad", skills: ["api", "react", "python", "java", "html"]},
    3 : {name: "Alf Otterstad", skills: ["api", "react", "java", "backend", "databases"]},
    4 : {name: "Maria Otterstad", skills: ["html", "css", "javascript", "react"]}
};

const express = require('express');
const app = express();
const helperFunctions = require('../helperFunctions');

const employeesRouter = express.Router();

// GET /employees/  returns employees in JSON
employeesRouter.get("/", (req, res) => {
    const sendJson = JSON.stringify(employees);
    res.status(200).send(sendJson);
});

// GET /employees/3 returns employee with id 3
employeesRouter.get("/:id", (req, res) => {
    const employee = employees[req.params.id];
    if(employee) {
        res.status(200).send(employee);
    } else {
        res.status(404).send("That employee does not exist");
    }
});

// POST /employees/?name=Marcus%20Otterstad&skill1=javascript&skill2=css&skill3=html creates new employee
employeesRouter.post("/", (req, res) => {
    const prevObjLength = Object.keys(employees).length;

    const skills = Object.values(req.query);
    const name = skills.shift();
    const employee = { name: name, skills: skills};

    employees[(prevObjLength + 1)] = employee;      // adds new employee to the object

    // if the length of employees increased, sends back the employee sent
    if(prevObjLength < Object.keys(employees).length) {
        res.status(200).send(employee);
    } else {
        res.status(404).send("didnt update");
    }
});

// PUT /employees/3/?name=Marcus%20Otterstad&skill1=javascript&skill2=css&skill3=html edits employee with id of 3
employeesRouter.put("/:id", (req, res) => {
    const changeId = req.params.id;
    const prevEmployee = employees[changeId];

    // creates new object    
    const skills = Object.values(req.query);
    const name = skills.shift();
    const employee = { name: name, skills: skills};
    
    // overwrites the employee at that id
    employees[changeId] = employee;

    // checks if the employee changed
    if(prevEmployee !== employees[changeId]) {
        res.status(200).send(employees[changeId]);
    } else {
        res.status(404).send("could not edit employee");
    }
});

// DELETE /employees/3 deletes employee with id of 3
employeesRouter.delete("/:id", (req, res) => {
    const deleteId = req.params.id;
    delete employees[deleteId];
    employees = helperFunctions.resetIds(employees);
    res.send(employees);
});

module.exports = employeesRouter;