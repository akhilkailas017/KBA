const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3005;

let todos = [];
let idCounter = 1;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/todos', (req, res) => {
    res.json(todos);
});
app.post('/api/todos', (req, res) => {
    const { task } = req.body;
    if (task) {
        const newTodo = { id: idCounter++, task };
        todos.push(newTodo);
        res.status(201).json(newTodo);
    } else {
        res.status(400).json({ error: 'Task content is required' });
    }
});

app.put('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    const todo = todos.find(t => t.id == id);
    if (todo && task) {
        todo.task = task;
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Todo not found or invalid data' });
    }
});

app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex(t => t.id == id);
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});
