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

//declare a variable for our port number
const PORT = process.env.PORT || 3000;

// turn on the server listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));