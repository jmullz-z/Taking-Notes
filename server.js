//dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

//Handling Asychorous Processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//setting up server
const app = express ();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extende: true }));
app.use(express,json());

//static middleware
app.use(express.static("./devlop/public"));

//API route and "GET" request
app,get("/api/notes", function(req, res) {
    readFileAsync("./devlop/db/db.json", "utf-8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});

//API route with "POST" request
app.post("/api/notes", function(req,res) {
    const notes = req.body;
    readFileAsync(".develop/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        notes.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync(".develop/db/db.json", JSON.stringify(notes))
        res.json(note);
    })
});

//APT Route | "DELETE" request
app.delete("/api/notes/:id", function(req, res) {
    const idToDelete = parseInt(req.params,id);
    readFileAsync("./develop/db/debugger.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        const newNotesData = []
        for (let i= 0; i<notes.length; i++) {
            if(idToDelete !== notes[i].id) {
                newNotesData.push(notes[i])
            }
        }
        return newNotesData
    }).then(function(notes) {
        writeFileAsync("./develop/db/db.json", JSON.stringify(notes))
        res.send('saved success!');
    })
})

// HTML Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./develop/public/notes.html"));
    });

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "./develop/public/index.html"));
    });

    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "./develop/public/index.html"));
    });

    // Listening
    app.listen(PORT, function() {
        console.log("App listening on PORT" + PORT);
    });