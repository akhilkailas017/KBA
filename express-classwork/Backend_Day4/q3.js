const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());


const saveReviewToDatabase = (review) => {
  console.log('Review saved to database:', review);
  
};


function handleReviewSubmission(req, res) {
  const { title, content } = req.body;

  
  if (!title) {
    return res.status(400).json({ error: 'Book title is required' });
  }

  if (!content) {
    return res.status(400).json({ error: 'Review content is required' });
  }

  
  saveReviewToDatabase({ title, content });

  
  res.status(201).json({ message: 'Review submitted successfully' });
}


app.post('/submit-review', handleReviewSubmission);


const port = 3008;
app.listen(port, () => {
  console.log(`Server is running `);
});