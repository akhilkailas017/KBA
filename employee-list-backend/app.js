const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3005;

let employees = [];
let idCounter = 1;

app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/api/employees', (req, res) => {
    res.json(employees);
});


app.post('/api/employees', (req, res) => {
    const { name, role } = req.body;
    if (name && role) {
        const newEmployee = { id: idCounter++, name, role };
        employees.push(newEmployee);
        res.status(201).json(newEmployee);
    } else {
        res.status(400).json({ error: 'Name and role are required' });
    }
});


app.put('/api/employees/:id', (req, res) => {
    const { id } = req.params;
    const { name, role } = req.body;
    const employee = employees.find(e => e.id == id);
    if (employee && name && role) {
        employee.name = name;
        employee.role = role;
        res.json(employee);
    } else {
        res.status(404).json({ error: 'Employee not found or invalid data' });
    }
});


app.delete('/api/employees/:id', (req, res) => {
    const { id } = req.params;
    const employeeIndex = employees.findIndex(e => e.id == id);
    if (employeeIndex !== -1) {
        employees.splice(employeeIndex, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'Employee not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
