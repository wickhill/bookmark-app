const express = require('express');
const cors = require("cors");
require('dotenv').config();

const app = express();
const db = require('./models')


// set up middleware
app.use(cors());


// INDUCES
  // INDEX - Index of clickable list items
app.get("/", (req, res) => {
  db.Bookmark.find({})
   .then(bookmarks => res.json(bookmarks))
   .catch((err) => res.json({ error: err.message }));
})


//SEEDING route for bookmarks
//Route to delete existing bookmarks and seed the database with initial data
app.get("/seed", function (req, res) {
  // Remove any existing bookmarks
  db.Bookmark.deleteMany({})
    .then(removedBookmark => {
      console.log(`Removed ${removedBookmark.deletedCount} bookmarks`)
      // Seed the bookmark collection with the seed data
      db.Bookmark.insertMany(db.seedBookmarks)
        .then(addedBookmark => {
          console.log(`Added ${addedBookmark.length} bookmarks`)
          res.json(addedBookmark)
        })
    })
})


// DELETE - Delete a bookmark
app.delete('/bookmarks/:id', async (req, res) => {
  try {
    const deletedBookmark = await db.Bookmark.findByIdAndDelete(req.params.id);
    if (!deletedBookmark) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }
    res.json({ message: 'Bookmark deleted successfully' });
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// UPDATE - Update a bookmark
app.put('/bookmarks/:id', async (req, res) => {
  try {
    const { title, url } = req.body;
    console.log(req.body, 333333333)
    const updatedBookmark = await db.Bookmark.findByIdAndUpdate(
      req.params.id,
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

// CREATE - Create a new bookmark
app.post('/bookmarks', async (req, res) => {
  try {
    const { title, url } = req.body;
    const newBookmark = new db.Bookmark({ title, url });
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
    const bookmark = await db.Bookmark.findById(req.params.id);
    if (!bookmark) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }
    res.json(bookmark);
  } catch (error) {
    console.error('Error retrieving bookmark:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//declare a variable for our port number
const PORT = process.env.PORT || 3000;

// turn on the server listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));