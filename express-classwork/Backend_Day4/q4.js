const express = require('express');
const app = express();


app.get('/user/:id', (req, res) => {
  const userId = req.params.id; 
  res.send(`Welcome, user with ID: ${userId}!`);
});


const port = 3009;
app.listen(port, () => {
  console.log(`Server is running `);
});