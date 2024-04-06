const express = require('express');
const cors = require("cors");
require('dotenv').config();

const app = express();
const db = require('./models')

const bookmarks = require('./bookmarks.json')

// set up middleware
app.use(cors());

// // INDUCES
//   // INDEX - Index of clickable list items
// app.get("/", (req, res) => {
//   db.Bookmark.find({})
//    .then(bookmarks => res.json(bookmarks))
//    .catch((err) => res.json({ error: err.message }));
// })

// CREATE - Create a new bookmark
app.post('/bookmarks', async (req, res) => {
  try {
    const { title, url } = req.body;
    const newBookmark = new Bookmark({ title, url });
    await newBookmark.save();
    res.status(201).json(newBookmark);
  } catch (error) {
    console.error('Error creating bookmark:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// SHOW - Show a single bookmark
app.get('/bookmarks/:id', async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params._id);
    if (!bookmark) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }
    res.json(bookmark);
  } catch (error) {
    console.error('Error retrieving bookmark:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// UPDATE - Update a bookmark
app.put('/bookmarks/:id', async (req, res) => {
  try {
    const { title, url } = req.body;
    const updatedBookmark = await Bookmark.findByIdAndUpdate(
      req.params._id,
      { title, url },
      { new: true }
    );
    if (!updatedBookmark) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }
    res.json(updatedBookmark);
  } catch (error) {
    console.error('Error updating bookmark:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE - Delete a bookmark
app.delete('/bookmarks/:id', async (req, res) => {
  try {
    const deletedBookmark = await Bookmark.findByIdAndDelete(req.params._id);
    if (!deletedBookmark) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }
    res.json({ message: 'Bookmark deleted successfully' });
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  app.get("/", (req, res) => {
    // send projects via JSON
    res.json(bookmarks);
  });

//declare a variable for our port number
const PORT = process.env.PORT || 3000;

// turn on the server listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));