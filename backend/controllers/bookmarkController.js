/* Require modules
--------------------------------------------------------------- */
const express = require("express");
const router = express.Router();

/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require("../models");

// INDEX - Index of clickable list items
router.get("/", (req, res) => {
    db.Bookmark.find({})
     .then(bookmarks => res.json(bookmarks))
     .catch((err) => res.json({ error: err.message }));
})

// CREATE - Create a new bookmark
router.post("/", async (req, res) => {
    console.log(req.body)
    const newBookmark = (req.body)
    await db.Bookmark.create(req.body)
    .then((bookmarks) => res.json(bookmarks))
    .catch((err) => res.json({ error: err.message }))
})

// SHOW - Show a single bookmark
router.get("/:id", (req, res) => {
    db.Bookmark.findById(req.params.id)
      .then((bookmarks) => {
        if (!bookmarks) res.status(404).json({ error: "Bookmark not found" })
        else res.json(bookmarks)
      })
      .catch((err) => res.json({ error: err.message }))
  })

  // UPDATE - Update a bookmark
  router.put("/:id", (req, res) => {
    db.Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true })
     .then((bookmarks) => {
        if (!bookmarks) res.status(404).json({ error: "Bookmark not found" })
        else res.json(bookmarks)
      })
     .catch((err) => res.json({ error: err.message }))
  })

  // DELETE - Delete a bookmark
  router.delete("/:id", (req, res) => {
    db.Bookmark.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: "Fruit successfully deleted" }))
        .catch((err) => res.json({ error: err.message }));
      })

      module.exports = router


