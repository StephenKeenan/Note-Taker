const express = require('express');
const path = require('path');
const NotesModel = require("./db/NotesModel.js")

const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db/db.json');

let note = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, function () {
    console.log('Server is listening: ' + PORT)
});


app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.get('/api/notes', function (req, res) {
    NotesModel.retriveNotes()
    .then(function (notes) {
        res.json(notes)
    }).catch(function(error) {
        res.json(error)
    })
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
    let db = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))
    let removeNotes = db.filter(items => items.id != id);
    fs.writeFileSync('./db/db.json', JSON.stringify(removeNotes));

    res.json(true);
});

// all other routes  display the index.html page
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});


