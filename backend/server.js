const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const bookmarksController = require('./controllers/bookmarkController')

// set up middleware
app.use(cors());


//home route for testing our app
app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.get("/bookmarks", (req, res) => {
    // send projects via JSON
    res.json(bookmarks);
  });

  app.use('/bookmarks', bookmarksController)

//declare a variable for our port number
const PORT = process.env.PORT || 3000;

// turn on the server listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));