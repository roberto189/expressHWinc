// require dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
// create express app
const app = express();
const PORT = process.env.PORT || 3001;
// middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
// ROUTES
// GET route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
// GET route for notes page
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});
// GET route for getting all notes
app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(notes);
});
// POST route for adding a new note
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    const cryptoUUID = crypto.randomBytes(16).toString('hex');
    newNote.id = cryptoUUID;
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(newNote);
});
// DELETE route for deleting a note by ID
app.delete('/api/notes/:id', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    const updatedNotes = notes.filter(note => note.id !== req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(updatedNotes));
    res.json({success: true});
});
// LISTEN for server
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});