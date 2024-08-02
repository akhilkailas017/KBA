const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/Todo');

const app = express();
const port = 3005;

mongoose.connect('mongodb://localhost:27017/todoapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

app.use(express.json());
app.use(express.static('public'));

app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

app.post('/api/todos', async (req, res) => {
    const { task } = req.body;
    if (typeof task === 'string' && task.trim() !== '') {
        try {
            const newTodo = new Todo({
                task: task.trim()
            });
            await newTodo.save();
            res.status(201).json(newTodo);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create todo' });
        }
    } else {
        res.status(400).json({ error: 'Task content is required and should be a non-empty string' });
    }
});

app.put('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    if (typeof task === 'string' && task.trim() !== '') {
        try {
            const updatedTodo = await Todo.findByIdAndUpdate(
                id,
                { task: task.trim() },
                { new: true, runValidators: true } 
            );
            if (updatedTodo) {
                res.json(updatedTodo);
            } else {
                res.status(404).json({ error: 'Todo not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to update todo' });
        }
    } else {
        res.status(400).json({ error: 'Task content is required and should be a non-empty string' });
    }
});

app.delete('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (deletedTodo) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
