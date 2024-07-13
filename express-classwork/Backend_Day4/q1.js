const express = require('express');
const app = express();


function logRequests(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next(); 
}


app.use(logRequests);


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/submit', (req, res) => {
  res.send('Form submitted!');
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running ${port} `);
});