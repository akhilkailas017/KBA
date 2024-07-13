const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const saveUserToDatabase = (user) => {
  console.log('User saved to database:', user);

};

function validateUserInput(req, res, next) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  next();
}


function processRegistration(req, res) {
  const { email, password } = req.body;


  saveUserToDatabase({ email, password });

  res.status(201).json({ message: 'User registered successfully' });
}


app.post('/register', validateUserInput, processRegistration);

const port = 3007;
app.listen(port, () => {
  console.log(`Server is running `);
});