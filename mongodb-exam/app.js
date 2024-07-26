const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const studentinfo = require('./Models/studentinfo.js');
const dotenv = require('dotenv');
app.use(express.json());
dotenv.config();

const uri = process.env.mongodb_uri;
mongoose.connect(uri);

const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", () => {
    console.log("Database Connected");
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/studentinfo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'studentinfo.html'));
});

app.post('/submit', async (req, res) => {
    try {
        const data = req.body;
        const result = await studentinfo.create(data);
        console.log(result);
        res.status(201).redirect('/thank-you');
    } catch (error) {
        console.log(error);
        res.status(500).json();
    }
});

app.get('/thank-you', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'submitted.html'));
});

app.get('/student/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view.html'));
});

app.get('/api/student/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const details = await studentinfo.findOne({ studentId: id });
        if (details) {
            res.json(details);
        } else {
            res.status(404).json({ message: 'details not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api/student/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedDetails = await studentinfo.deleteOne({ studentId: id });
        if (deletedDetails) {
            res.status(200).json({ message: 'deleted successfully' });
        } else {
            res.status(404).json({ message: 'Details not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/students/grade/:grade', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'gradelist.html'));
})


app.get('/api/studentinfo/student/:grade', async (req, res) => {
    try {
        const grade = req.params.grade;
        const gradelist = await studentinfo.find({ grade: { $regex: new RegExp(grade, "i") } });

        if (gradelist.length > 0) {
            res.status(200).json(gradelist);
        } else {
            res.status(404).json({ message: 'No studentinfo found this grade' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});





app.get('/update/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'update.html'));
})
app.get('/student/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'update.html'));
})


app.put("/api/student/:id", async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const result = await studentinfo.updateOne({ studentId: id }, { $set: data })
        res.status(200).json(result)
    } catch (error) {
        res.json(error)
    }
})


app.get('/allstudents', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'allstudents.html'));
})

app.get('/api/allstudentlist', async (req, res) => {
    try {
      
        const allstudentslist = await studentinfo.find();

        if (allstudentslist.length > 0) {
            res.status(200).json(allstudentslist);
        } else {
            res.status(404).json({ message: 'No student info found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});






const PORT = 3005;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});