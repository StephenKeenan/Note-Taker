const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db/db.json');
let note = [];
const { v4: uuidv4 } = require('uuid')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, function () {
    console.log('Server is listening: http://localhost:' + PORT);
});


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/assets/js/index.js'));
});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.get('/api/notes', function (req, res) {
    return res.json(JSON.parse(fs.readFileSync("./db/db.json")));
});


app.post('/api/notes', (req, res) => {
    let note = req.body;
    let db = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    note.id = uuidv4();
    db.push(note);
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json(note);
});

app.delete('/api/notes/:id', function (req, res) {
    let id = (req.params.id);
    let db = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let removeNotes = db.filter(items => items.id != id);
    fs.writeFileSync('./db/db.json', JSON.stringify(removeNotes));
    res.json(true);
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + './public/index.html'));
});
