const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const app = express ();
const PORT = process.env.PORT || 3000;
const db = require("./db/db.json");

let note = [];

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, function () {
    console.log("Server is listening: " + PORT)
});


app.get("*", function (req, res){
    res.sendFile(path.join(__dirname, "public/assets/js/index.js"));
});

app.get("/notes", function (req, res){
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.get("/api/notes", function (req, res) {
    return res.json(JSON.parse(fs.readFileSync("/.db/db.json")))
});
