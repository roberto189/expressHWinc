const express = require('express');
const path = require('path');
const notes = require('./db/db.json')
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a review`);
  

    const { title, text } = req.body;
  
    if (title && text) {
      const newReview = {
        title,
        text,
      };
  
      const response = {
        status: 'success',
        body: newReview,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting review');
    }
  });
  
app.get('/api/notes', (req, res) => {
    console.info(`GET /api/notes`);
    res.status(200).json(notes);
  });

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));