//dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const {notes}=require("./db/db.json");
const { request } = require("http");
const uniqid=require("uniqid")

//Handling Asychorous Processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//setting up server
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static middleware
app.use(express.static("public"));

//API route and "GET" request
app.get("/api/notes", function(req, res) {
    // readFileAsync("./db/db.json", "utf-8").then(function(data) {
    //     notes = [].concat(JSON.parse(data))
    let results=notes
        res.json(results);
    });


//API route with "POST" request
app.post("/api/notes", function(req,res) {
    req.body.id=uniqid()
    // const notes = req.body;
    // readFileAsync("./db/db.json", "utf8").then(function(data) {
    //     const notes = [].concat(JSON.parse(data));
    //     notes.id = notes.length + 1
    //     notes.push(note);
    //     return notes
    // }).then(function(notes) {
    //     writeFileAsync("./db/db.json", JSON.stringify(notes))
    const note=req.body
    notes.push(note)
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify({notes}, null, 2)
    )   
    res.json(note);
});

//APT Route | "DELETE" request
app.delete("/api/notes/:id", function(req, res) {
    const idToDelete = req.params.id;
    // readFileAsync("/db/debugger.json", "utf8").then(function(data) {
    //    const newNotesData = []
    //   const notes = [].concat(JSON.parse(data));
      for (let i= 0; i<notes.length; i++) {
            if(idToDelete ===notes[i].id) {
                // newNotesData.push(notes[i])
                notes.splice(i,1)
                fs.writeFileSync(
                    path.join(__dirname, "./db/db.json"),
                    JSON.stringify({notes}, null, 2)
                )   
            }
        }
    //     return newNotesData
    // }).then(function(notes) {
    //     writeFileAsync("./db/db.json", JSON.stringify(notes))
        res.send('saved success!');
})

// HTML Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
    });

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "./public/index.html"));
    });

    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "./public/index.html"));
    });

    // Listening
    app.listen(PORT, function() {
        console.log("App listening on PORT" + PORT);
    });