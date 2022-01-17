const express = require('express');
const app = express();
const employeesRouter = require('./routes/employees');

const PORT = 4001;

app.use("/employees", employeesRouter);

app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT + ".");
});