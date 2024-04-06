const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
// require('dotenv').config();

const app = express();
const db = require('./models')

// const bookmarks = require('../bookmarks.json')

// set up middleware
app.use(cors());

//home route for testing our app
app.get("/", (req, res) => {
    res.send("Hello World");
  });


  // INDEX - Index of clickable list items
app.get("/", (req, res) => {
  db.Bookmark.find({})
   .then(bookmarks => res.json(bookmarks))
   .catch((err) => res.json({ error: err.message }));
})

// CREATE - Create a new bookmark
app.post("/", async (req, res) => {
  console.log(req.body)
  const newBookmark = (req.body)
  await db.Bookmark.create(req.body)
  .then((bookmarks) => res.json(bookmarks))
  .catch((err) => res.json({ error: err.message }))
})

// SHOW - Show a single bookmark
app.get("/:id", (req, res) => {
  db.Bookmark.findById(req.params.id)
    .then((bookmarks) => {
      if (!bookmarks) res.status(404).json({ error: "Bookmark not found" })
      else res.json(bookmarks)
    })
    .catch((err) => res.json({ error: err.message }))
})

// UPDATE - Update a bookmark
app.put("/:id", (req, res) => {
  db.Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true })
   .then((bookmarks) => {
      if (!bookmarks) res.status(404).json({ error: "Bookmark not found" })
      else res.json(bookmarks)
    })
   .catch((err) => res.json({ error: err.message }))
})

// DELETE - Delete a bookmark
app.delete("/:id", (req, res) => {
  db.Bookmark.findByIdAndDelete(req.params.id)
      .then(() => res.json({ message: "Fruit successfully deleted" }))
      .catch((err) => res.json({ error: err.message }));
    })

  app.get("/bookmarks", (req, res) => {
    // send projects via JSON
    res.json(bookmarks);
  });

//declare a variable for our port number
const PORT = process.env.PORT || 3000;

// turn on the server listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));