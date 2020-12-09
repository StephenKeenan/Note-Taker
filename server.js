//start with dependencies express is the app
const express = require('express');
const app = express(); // app is express 
const path = require("path");  
const PORT = process.env.PORT || 3000; //something for the PORT to listen incoming request 
const fs = require("fs");
const db = require("./db/db.json");// getting the db file to make the changes in the notes
// console.log(db); //console log whats in the db.json file
let note = [];
//unique ID for the notes
const {v4 : uuidv4} = require('uuid')

//ALL APP.USE (3)

//the app.use is setting up the function for express to handle the data parsing. 
app.use(express.json()); //function to call the inforamtion to the body req. 

app.use(express.static(path.join(__dirname, "public"))); //using express.static and app.use to pull all the files from the public folder to use mostly from the css styling. 

app.use(express.urlencoded({extended: true})); //using the app to express acess to the body requirements (req) function 

//APP CALLING THE LISTENING FUNCTION TO THE LOCAL HOST

app.listen(PORT, function () {
    console.log("Click To Check Out: http://localhost:" + PORT);
}); //starts the server to begin to listen to the PORT  and then will console log 

//ALL APP.GET (4)

app.get("/", function (req, res){
    res.sendFile(path.join(__dirname, "public/assets/js/index.js"));
}); // express reaching out to the index.js to send a file after the response 

//app.get for the notes.html from the public folder
app.get("/notes", function (req, res){
    res.sendFile(path.join(__dirname, "public/notes.html"))
}); // ROUTES interact with public notes html database:

// this parses the information the the left side and appends the notes. // if you add dataBase in the () then it will project on the screen under the notes saved. //
app.get("/api/notes", function (req, res) {
    return res.json(JSON.parse(fs.readFileSync("./db/db.json")));
});

//APP.POST FUNCTION

//creating a function for the post method to appear on the screen after a note is written and saved. an app post method lets you saved notes that you create and also post the notes on the side. 
app.post("/api/notes", (req, res) => {
    let note = req.body;
    let db = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    // console.log(db);
    note.id = uuidv4();
    // console.log(note); 
    db.push(note);
    fs.writeFileSync ("./db/db.json", JSON.stringify(db));
    res.json(note);
});

app.delete("/api/notes/:id", function (req, res){
    let id = (req.params.id);
    let db = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    // console.log("deleted item", id);
    let removeNotes = db.filter(items => items.id !=id);
    fs.writeFileSync("./db/db.json", JSON.stringify(removeNotes));
    
    res.json(true);
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + "./public/index.html"));
});
