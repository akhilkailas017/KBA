const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3002;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let employees = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/addEmployee', (req, res) => {
    const { name, role } = req.body;
    employees.push({ name, role });
    res.redirect('/');
});

app.post('/updateEmployee', (req, res) => {
    const { index, name, role } = req.body;
    employees[index] = { name, role };
    res.redirect('/');
});

app.post('/deleteEmployee', (req, res) => {
    const { index } = req.body;
    employees.splice(index, 1);
    res.redirect('/');
});

app.get('/employees', (req, res) => {
    res.json(employees);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
