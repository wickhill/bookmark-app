const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// set up middleware
app.use(cors());


//home route for testing our app
app.get("/", (req, res) => {
    res.send("Hello World");
  });

  // Seed route to seed our data
  app.get('/seed', function (req, res) {
    // Remove any existing fruits
    db.Bookmark.deleteMany({})
        .then(removedBookmarks => {
            console.log(`Removed ${removedBookmarks.length} bookmarks`)

            // Seed the fruits collection with the seed data
            db.Fruit.insertMany(db.seedFruits)
                .then(addedBookmarks => {
                    console.log(`Added ${addedBookmarks.length} Bookmarks`)
                    res.json(addedBookmarks)
                })
        })
})

//declare a variable for our port number
const PORT = process.env.PORT || 3000;

// turn on the server listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));